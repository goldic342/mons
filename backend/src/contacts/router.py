from fastapi import APIRouter, HTTPException, Depends, Request
from src.contacts import service
from src.contacts.limiter import rate_limiter
from src.contacts.schemas import ContactCreate, SendedStatus
from src.auth.dependencies import get_current_user

router = APIRouter(prefix="/contacts", tags=["contacts"])


@router.post("/", dependencies=[Depends(rate_limiter)])
async def create_contact(payload: ContactCreate, request: Request):
    service.create_contact(payload.contact_value)
    await service.send_ntfy(payload.contact_value, request)
    return SendedStatus(successful=True)


@router.get("/", dependencies=[Depends(get_current_user)])
def get_contacts():
    return service.get_all_contacts()


@router.get("/{contact_id}", dependencies=[Depends(get_current_user)])
def get_contact(contact_id: int):
    contact = service.get_contact(contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Not found")
    return contact


@router.delete("/{contact_id}", dependencies=[Depends(get_current_user)])
def delete_contact(contact_id: int):
    if not service.get_contact(contact_id):
        raise HTTPException(status_code=404, detail="Not found")

    service.delete_contact(contact_id)
    return {"message": "Contact deleted"}
