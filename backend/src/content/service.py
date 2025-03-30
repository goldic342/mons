from src.database import conn


def create_content(key: str, section: str, name: str, value: str):
    c = conn.cursor()
    c.execute(
        "INSERT INTO content (key, section, name, value) VALUES (?, ?, ?, ?)",
        (key, section, name, value),
    )
    conn.commit()


def get_content_by_key(key: str) -> dict | None:
    c = conn.cursor()
    c.execute("SELECT * FROM content WHERE key = ?", (key,))
    row = c.fetchone()
    return dict(row) if row else None


def get_all_content() -> list[dict]:
    c = conn.cursor()
    c.execute("SELECT * FROM content")
    return [dict(row) for row in c.fetchall()]


def update_content(
    key: str,
    name: str | None = None,
    value: str | None = None,
    section: str | None = None,
):
    c = conn.cursor()
    fields = []
    values = []

    if name is not None:
        fields.append("name = ?")
        values.append(name)
    if value is not None:
        fields.append("value = ?")
        values.append(value)
    if section is not None:
        fields.append("section = ?")
        values.append(value)

    if not fields:
        return

    values.append(key)
    sql = f"UPDATE content SET {', '.join(fields)} WHERE key = ?"
    c.execute(sql, values)
    conn.commit()


def delete_content(key: str):
    c = conn.cursor()
    c.execute("DELETE FROM content WHERE key = ?", (key,))
    conn.commit()


def get_content_by_section(section: str) -> list[dict]:
    c = conn.cursor()
    c.execute("SELECT * FROM content WHERE section = ?", (section,))
    return [dict(row) for row in c.fetchall()]
