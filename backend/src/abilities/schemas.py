from pydantic import BaseModel


class AbilityCreate(BaseModel):
    name: str
    description: str


class AbilityUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
