from fastapi import APIRouter, Depends, HTTPException
from src.auth.dependencies import get_current_user
from src.content.schemas import ContentCreate, ContentUpdate
from src.content import service

router = APIRouter(
    prefix="/content", tags=["content"], dependencies=[Depends(get_current_user)]
)


@router.post("/")
def create_content(payload: ContentCreate):
    try:
        service.create_content(
            payload.key, payload.section, payload.name, payload.value
        )
        return {"message": f"Content '{payload.key}' created"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/{key}")
def get_content(key: str):
    content = service.get_content_by_key(key)
    if not content:
        raise HTTPException(status_code=404, detail="Not found")
    return content


@router.get("/")
def get_all_content():
    return service.get_all_content()


@router.put("/{key}")
def update_content(key: str, payload: ContentUpdate):
    if not service.get_content_by_key(key):
        raise HTTPException(status_code=404, detail="Not found")

    service.update_content(key, payload.section, payload.name, payload.value)
    return {"message": f"Content '{key}' updated"}


@router.delete("/{key}")
def delete_content(key: str):
    if not service.get_content_by_key(key):
        raise HTTPException(status_code=404, detail="Not found")

    service.delete_content(key)
    return {"message": f"Content '{key}' deleted"}


@router.get("/section/{section_name}")
def get_content_by_section(section_name: str):
    content = service.get_content_by_section(section_name)
    if not content:
        raise HTTPException(status_code=404, detail="No content in this section")
    return content
