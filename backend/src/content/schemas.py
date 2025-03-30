from pydantic import BaseModel


class ContentCreate(BaseModel):
    key: str
    section: str
    name: str
    value: str


class ContentUpdate(BaseModel):
    section: str
    name: str
    value: str
