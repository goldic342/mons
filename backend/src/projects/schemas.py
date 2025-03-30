from fastapi import Form
from pydantic import BaseModel
from typing import Optional, List


class ProjectBase(BaseModel):
    name: str
    tags: str
    type: str
    reading_time: int
    thumbnail_url: str | None = None
    calls_section: str
    analyzis_section: str
    values_section: str
    mission_section: str
    distribution_section: str

    @classmethod
    def as_form(
        cls,
        name: str = Form(...),
        tags: str = Form(...),
        type: str = Form(...),
        reading_time: int = Form(...),
        calls_section: str = Form(...),
        analyzis_section: str = Form(...),
        values_section: str = Form(...),
        mission_section: str = Form(...),
        distribution_section: str = Form(...),
    ):
        return cls(
            name=name,
            tags=tags,
            type=type,
            reading_time=reading_time,
            calls_section=calls_section,
            analyzis_section=analyzis_section,
            values_section=values_section,
            mission_section=mission_section,
            distribution_section=distribution_section,
        )


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    tags: Optional[str] = None
    type: Optional[str] = None
    reading_time: Optional[int] = None
    thumbnail_url: Optional[str] = None
    calls_section: Optional[str] = None
    analyzis_section: Optional[str] = None
    values_section: Optional[str] = None
    mission_section: Optional[str] = None
    distribution_section: Optional[str] = None

    def to_dict(self):
        return {k: v for k, v in self.dict().items() if v is not None}


class ProjectContentOut(BaseModel):
    id: int
    project_id: int
    content_url: str


class ProjectOut(ProjectBase):
    id: int
    contents: List[ProjectContentOut] = []
