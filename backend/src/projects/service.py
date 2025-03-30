from fastapi import UploadFile
from src.database import conn
from src.projects.schemas import ProjectCreate, ProjectUpdate, ProjectOut
from src.projects.contents import get_project_contents
from src.utils import save_file


def create_project(data: ProjectCreate, thumbnail: UploadFile) -> int:
    c = conn.cursor()
    thumbnail_url = save_file("projects", thumbnail)

    c.execute(
        """
        INSERT INTO projects (
            name, tags, type, reading_time, thumbnail_url,
            calls_section, analyzis_section, values_section,
            mission_section, distribution_section
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            data.name,
            data.tags,
            data.type,
            data.reading_time,
            thumbnail_url,
            data.calls_section,
            data.analyzis_section,
            data.values_section,
            data.mission_section,
            data.distribution_section,
        ),
    )
    conn.commit()
    return c.lastrowid  # type: ignore


def get_project(id: int) -> ProjectOut | None:
    c = conn.cursor()
    c.execute("SELECT * FROM projects WHERE id = ?", (id,))
    row = c.fetchone()
    if not row:
        return None
    project = dict(row)
    contents = get_project_contents(id)
    return ProjectOut(**project, contents=contents)  # type: ignore[]


def get_all_projects() -> list[ProjectOut]:
    c = conn.cursor()
    c.execute("SELECT * FROM projects")
    rows = c.fetchall()
    return [
        ProjectOut(**dict(row), contents=get_project_contents(row["id"]))
        for row in rows
    ]


def update_project(id: int, data: ProjectUpdate):
    update_data = data.to_dict()
    if not update_data:
        return
    c = conn.cursor()
    fields = [f"{k} = ?" for k in update_data]
    values = list(update_data.values())
    values.append(id)
    sql = f"UPDATE projects SET {', '.join(fields)} WHERE id = ?"
    c.execute(sql, values)
    conn.commit()


def delete_project(id: int):
    c = conn.cursor()
    c.execute("DELETE FROM projects WHERE id = ?", (id,))
    conn.commit()
