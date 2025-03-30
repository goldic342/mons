from fastapi import APIRouter, Request, HTTPException, Depends
from src.auth.service import (
    get_user_by_username,
    get_all_users,
    delete_user,
    verify_password,
    create_user,
)
from src.auth.schemas import LoginRequest, RegisterRequest
from src.auth.dependencies import get_current_user

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login")
def login(req: Request, form: LoginRequest):
    user = get_user_by_username(form.username)
    if not user or not verify_password(form.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    req.session["user_id"] = user["id"]
    return {"ok": True}


@router.post("/logout")
def logout(req: Request):
    req.session.pop("user_id", None)
    return {"ok": True}


@router.post("/users", dependencies=[Depends(get_current_user)])
def register(form: RegisterRequest):
    try:
        user_id = create_user(form.username, form.password)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    return {"id": user_id}


@router.get("/check")
def check(user_id: int = Depends(get_current_user)):
    return {"ok": True if user_id else False}


@router.get("/users", dependencies=[Depends(get_current_user)])
def list_users():
    return get_all_users()


@router.delete("/users/{user_id}", dependencies=[Depends(get_current_user)])
def remove_user(user_id: str):
    try:
        delete_user(user_id)
        return {"message": f"User '{user_id}' deleted"}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
