import os
from uuid import uuid4
from src.database import conn
from fastapi import UploadFile
from src.employees.utils import parse_text_list

SAVE_DIR = "/media/employees"
os.makedirs(f".{SAVE_DIR}", exist_ok=True)


def save_photo(file: UploadFile) -> str:
    ext = os.path.splitext(file.filename)[1]
    filename = f"{uuid4().hex}{ext}"
    path = os.path.join(SAVE_DIR, filename)

    with open(f".{path}", "wb") as f:
        f.write(file.file.read())
    return f"{path}"


def create_employee(
    name: str,
    position: str,
    position_full: str,
    industry: str,
    photo: UploadFile,
    experience_text: str,
    competention_text: str,
):
    photo_url = save_photo(photo)
    experience = "\n".join(parse_text_list(experience_text))
    competention = "\n".join(parse_text_list(competention_text))

    c = conn.cursor()
    c.execute(
        """
        INSERT INTO employees (
            name, position, position_full,
            industry, photo_url,
            experience, professional_competention
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        (name, position, position_full, industry, photo_url, experience, competention),
    )
    conn.commit()


def get_employee(id: int) -> dict | None:
    c = conn.cursor()
    c.execute("SELECT * FROM employees WHERE id = ?", (id,))
    row = c.fetchone()
    return dict(row) if row else None


def get_all_employees() -> list[dict]:
    c = conn.cursor()
    c.execute("SELECT * FROM employees")
    return [dict(row) for row in c.fetchall()]


def update_employee(
    id: int,
    name: str | None = None,
    position: str | None = None,
    position_full: str | None = None,
    industry: str | None = None,
    experience_text: str | None = None,
    competention_text: str | None = None,
    photo: UploadFile | None = None,
):
    c = conn.cursor()

    fields = []
    values = []

    update_map = {
        "name": name,
        "position": position,
        "position_full": position_full,
        "industry": industry,
        "experience": "\n".join(parse_text_list(experience_text))
        if experience_text
        else None,
        "professional_competention": "\n".join(parse_text_list(competention_text))
        if competention_text
        else None,
    }

    for column, value in update_map.items():
        if value is not None:
            fields.append(f"{column} = ?")
            values.append(value)

    if photo:
        photo_url = save_photo(photo)
        fields.append("photo_url = ?")
        values.append(photo_url)

    if not fields:
        return  # nothing to update

    values.append(id)
    sql = f"UPDATE employees SET {', '.join(fields)} WHERE id = ?"
    c.execute(sql, values)
    conn.commit()


def delete_employee(id: int):
    c = conn.cursor()
    c.execute("DELETE FROM employees WHERE id = ?", (id,))
    conn.commit()
