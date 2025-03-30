from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from src.auth.dependencies import get_current_user
from src.projects import service, contents
from src.projects.schemas import (
    ProjectCreate,
    ProjectUpdate,
    ProjectOut,
    ProjectContentOut,
)

router = APIRouter(
    prefix="/projects", tags=["projects"], dependencies=[Depends(get_current_user)]
)


@router.post("/", response_model=int)
def create_project(
    payload: ProjectCreate = Depends(ProjectCreate.as_form),
    thumbnail: UploadFile = File(...),
):
    return service.create_project(payload, thumbnail)


@router.put("/{project_id}")
def update_project(
    project_id: int,
    payload: ProjectUpdate,
):
    if not service.get_project(project_id):
        raise HTTPException(status_code=404, detail="Project not found")
    service.update_project(project_id, payload)
    return {"message": "Project updated"}


@router.delete("/{project_id}")
def delete_project(
    project_id: int,
):
    if not service.get_project(project_id):
        raise HTTPException(status_code=404, detail="Project not found")
    service.delete_project(project_id)
    return {"message": "Project deleted"}


@router.post("/{project_id}/contents", response_model=ProjectContentOut)
def upload_project_content(
    project_id: int,
    file: UploadFile = File(...),
):
    if not service.get_project(project_id):
        raise HTTPException(status_code=404, detail="Project not found")

    id, url = contents.add_project_content(project_id, file)
    return ProjectContentOut(id=id, project_id=project_id, content_url=url)


@router.delete("/contents/{content_id}")
def delete_project_content(
    content_id: int,
):
    contents.delete_project_content(content_id)
    return {"ok": True}
