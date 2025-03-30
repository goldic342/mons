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
        return {"message": "Content created"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/{id}")
def get_content(id: int):
    content = service.get_content_by_id(id)
    if not content:
        raise HTTPException(status_code=404, detail="Not found")
    return content


@router.get("/")
def get_all_content():
    return service.get_all_content()


@router.put("/{id}")
def update_content(id: int, payload: ContentUpdate):
    if not service.get_content_by_id(id):
        raise HTTPException(status_code=404, detail="Not found")
    service.update_content(id, payload.section, payload.name, payload.value)
    return {"id": id}


@router.delete("/{id}")
def delete_content(id: int):
    if not service.get_content_by_id(id):
        raise HTTPException(status_code=404, detail="Not found")

    service.delete_content(id)
    return {"message": f"Content '{id}' deleted"}


@router.get("/section/{section_name}")
def get_content_by_section(section_name: str):
    content = service.get_content_by_section(section_name)
    if not content:
        raise HTTPException(status_code=404, detail="No content in this section")
    return content
