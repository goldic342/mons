from fastapi import UploadFile
from src.database import conn
from src.utils import save_file


def add_project_content(
    project_id: int, upload_file: UploadFile
) -> tuple[int | None, str]:
    url = save_file("projects", upload_file)
    c = conn.cursor()
    c.execute(
        "INSERT INTO project_contents (project_id, content_url) VALUES (?, ?)",
        (project_id, url),
    )
    conn.commit()
    return (c.lastrowid, url)


def get_project_contents(project_id: int) -> list[dict]:
    c = conn.cursor()
    c.execute("SELECT * FROM project_contents WHERE project_id = ?", (project_id,))
    return [dict(row) for row in c.fetchall()]


def delete_project_content(id: int):
    c = conn.cursor()
    c.execute("DELETE FROM project_contents WHERE id = ?", (id,))
    conn.commit()
