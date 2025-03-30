from fastapi import Request, HTTPException
import httpx
from src.config import settings
import time


LAST_REQUEST_TIME = {}


async def get_ip_info(ip: str) -> dict:
    """Fetches location info based on IP address."""
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"https://ipinfo.io/{ip}/json")
            if response.status_code == 200:
                return response.json()
    except Exception:
        pass
    return {}


async def rate_limiter(request: Request):
    """Rate limits requests to one per 30 minutes per IP address."""
    user_ip = request.client.host
    now = time.time()
    last_request = LAST_REQUEST_TIME.get(user_ip, 0)

    if now - last_request < settings.CONTACT_RATELIMIT:
        raise HTTPException(
            status_code=429, detail="Too many requests from this IP. Try again later."
        )

    LAST_REQUEST_TIME[user_ip] = now


def get_device_info(user_agent: str) -> str:
    """Parses User-Agent string to detect browser and OS."""
    browsers = ["Chrome", "Firefox", "Safari", "Edge", "Opera", "MSIE", "Trident"]
    os_list = ["Windows", "Mac OS", "Linux", "Android", "iOS", "Ubuntu"]

    detected_browser = "Unknown Browser"
    detected_os = "Unknown OS"

    for browser in browsers:
        if browser in user_agent:
            detected_browser = browser
            break

    for os in os_list:
        if os in user_agent:
            detected_os = os
            break

    return f"{detected_browser} on {detected_os}"


def get_accept_language(accept_lang: str) -> str:
    """Parses Accept-Language header and extracts primary language."""
    return accept_lang.split(",")[0] if accept_lang else "Unknown"
