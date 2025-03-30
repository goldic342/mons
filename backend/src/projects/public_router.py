from fastapi import APIRouter, HTTPException
from src.projects import service
from src.projects.schemas import ProjectOut, ProjectContentOut

router = APIRouter(prefix="/projects", tags=["projects (public)"])


@router.get("/", response_model=list[ProjectOut])
def list_projects():
    return service.get_all_projects()


@router.get("/{project_id}", response_model=ProjectOut)
def get_project(project_id: int):
    project = service.get_project(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@router.get("/{project_id}/contents", response_model=list[ProjectContentOut])
def list_project_contents(project_id: int):
    return service.get_project_contents(project_id)
