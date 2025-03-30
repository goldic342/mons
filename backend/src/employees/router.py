from fastapi import APIRouter, File, Form, UploadFile, HTTPException, Depends
from src.auth.dependencies import get_current_user
from src.employees import service

router = APIRouter(
    prefix="/employees", tags=["employees"], dependencies=[Depends(get_current_user)]
)


@router.post("/")
def create_employee(
    name: str = Form(...),
    position: str = Form(...),
    position_full: str = Form(...),
    industry: str = Form(...),
    experience: str = Form(...),
    competention: str = Form(...),
    photo: UploadFile = File(...),
):
    service.create_employee(
        name=name,
        position=position,
        position_full=position_full,
        industry=industry,
        photo=photo,
        experience_text=experience,
        competention_text=competention,
    )
    return {"message": f"Employee '{name}' created"}


@router.get("/")
def get_all_employees():
    return service.get_all_employees()


@router.get("/{employee_id}")
def get_employee(
    employee_id: int,
):
    emp = service.get_employee(employee_id)
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")
    return emp


@router.put("/{employee_id}")
def update_employee(
    employee_id: int,
    name: str | None = Form(None),
    position: str | None = Form(None),
    position_full: str | None = Form(None),
    industry: str | None = Form(None),
    experience: str | None = Form(None),
    competention: str | None = Form(None),
    photo: UploadFile | None = File(None),
):
    existing = service.get_employee(employee_id)
    if not existing:
        raise HTTPException(status_code=404, detail="Employee not found")

    service.update_employee(
        id=employee_id,
        name=name,
        position=position,
        position_full=position_full,
        industry=industry,
        experience_text=experience,
        competention_text=competention,
        photo=photo,
    )

    return {"message": f"Employee '{employee_id}' updated"}


@router.delete("/{employee_id}")
def delete_employee(
    employee_id: int,
):
    if not service.get_employee(employee_id):
        raise HTTPException(status_code=404, detail="Employee not found")
    service.delete_employee(employee_id)
    return {"message": f"Employee {employee_id} deleted"}
