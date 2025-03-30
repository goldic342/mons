from fastapi import Request
import httpx
from src.contacts.limiter import get_accept_language, get_device_info, get_ip_info
from src.config import settings
from src.database import conn


def create_contact(contact_value: str):
    c = conn.cursor()
    c.execute("INSERT INTO contacts (contact_value) VALUES (?)", (contact_value,))
    conn.commit()


async def send_ntfy(contact_value, request: Request):
    user_ip = request.client.host

    ip_data = {}
    if user_ip != "127.0.0.1":
        ip_data = await get_ip_info(user_ip)

    location = ip_data.get("city", "Unknown") + ", " + ip_data.get("country", "Unknown")
    isp = ip_data.get("org", "Unknown ISP")

    user_agent = request.headers.get("user-agent", "unknown")
    accept_lang = request.headers.get("Accept-Language", "Unknown")

    device_info = get_device_info(user_agent)
    user_language = get_accept_language(accept_lang)

    message = (
        f"*Новый клиент!*\n"
        f"📱 *Контактные данные:* {contact_value}\n"
        f"🌍 *IP Address:* `{user_ip}`\n"
        f"📍 *Location:* `{location}`\n"
        f"🔌 *ISP:* `{isp}`\n"
        f"💻 *Device:* `{device_info}`\n"
        f"🗣 *Preferred Language:* `{user_language}`\n\n"
        f"*Raw Data*\n"
        f"*UserAgent*: `{user_agent}`\n"
        f"*Accept-Language*: `{accept_lang}`"
    )

    url = f"https://api.telegram.org/bot{settings.BOT_TOKEN}/sendMessage"
    payload = {
        "chat_id": settings.CHAT_ID,
        "text": message,
        "parse_mode": "Markdown",
    }

    async with httpx.AsyncClient() as client:
        return await client.post(url, json=payload)


def get_contact(id: int) -> dict | None:
    c = conn.cursor()
    c.execute("SELECT * FROM contacts WHERE id = ?", (id,))
    row = c.fetchone()
    return dict(row) if row else None


def get_all_contacts() -> list[dict]:
    c = conn.cursor()
    c.execute("SELECT * FROM contacts")
    return [dict(row) for row in c.fetchall()]


def delete_contact(id: int):
    c = conn.cursor()
    c.execute("DELETE FROM contacts WHERE id = ?", (id,))
    conn.commit()
