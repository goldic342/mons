from src.database import conn


def create_ability(name: str, description: str):
    c = conn.cursor()
    c.execute(
        "INSERT INTO abilities (name, description) VALUES (?, ?)", (name, description)
    )
    conn.commit()


def get_ability(id: int) -> dict | None:
    c = conn.cursor()
    c.execute("SELECT * FROM abilities WHERE id = ?", (id,))
    row = c.fetchone()
    return dict(row) if row else None


def get_all_abilities() -> list[dict]:
    c = conn.cursor()
    c.execute("SELECT * FROM abilities")
    return [dict(row) for row in c.fetchall()]


def update_ability(id: int, name: str | None = None, description: str | None = None):
    c = conn.cursor()
    fields = []
    values = []

    if name is not None:
        fields.append("name = ?")
        values.append(name)

    if description is not None:
        fields.append("description = ?")
        values.append(description)

    if not fields:
        return  # nothing to update

    values.append(id)
    sql = f"UPDATE abilities SET {', '.join(fields)} WHERE id = ?"
    c.execute(sql, values)
    conn.commit()


def delete_ability(id: int):
    c = conn.cursor()
    c.execute("DELETE FROM abilities WHERE id = ?", (id,))
    conn.commit()
