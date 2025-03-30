from pydantic import BaseModel


class ContactCreate(BaseModel):
    contact_value: str


class SendedStatus(BaseModel):
    successful: bool = True
