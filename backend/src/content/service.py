from src.database import conn


def create_content(key: str, section: str, name: str, value: str):
    c = conn.cursor()
    c.execute(
        "INSERT INTO content (key, section, name, value) VALUES (?, ?, ?, ?)",
        (key, section, name, value),
    )
    conn.commit()


def get_content_by_id(id: int) -> dict | None:
    c = conn.cursor()
    c.execute("SELECT * FROM content WHERE id = ?", (id,))
    row = c.fetchone()
    return dict(row) if row else None


def get_all_content() -> list[dict]:
    c = conn.cursor()
    c.execute("SELECT * FROM content")
    return [dict(row) for row in c.fetchall()]


def update_content(
    id: int,
    key: str | None = None,
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
        values.append(section)
    if key is not None:
        fields.append("key = ?")
        values.append(key)

    if not fields:
        return

    values.append(id)
    sql = f"UPDATE content SET {', '.join(fields)} WHERE id = ?"
    c.execute(sql, values)
    conn.commit()


def delete_content(id: int):
    c = conn.cursor()
    c.execute("DELETE FROM content WHERE id = ?", (id,))
    conn.commit()


def get_content_by_section(section: str) -> list[dict]:
    c = conn.cursor()
    c.execute("SELECT * FROM content WHERE section = ?", (section,))
    return [dict(row) for row in c.fetchall()]


def get_content_by_key(key: str) -> dict | None:
    c = conn.cursor()
    c.execute("SELECT * FROM content WHERE key = ?", (key,))
    row = c.fetchone()
    return dict(row) if row else None
