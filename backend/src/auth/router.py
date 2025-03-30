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


@router.post("/register", dependencies=[Depends(get_current_user)])
def register(form: RegisterRequest):
    try:
        create_user(form.username, form.password)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    return {"message": f"User '{form.username}' successfully created"}


@router.get("/check")
def check(user_id: int = Depends(get_current_user)):
    return {"ok": True if user_id else False}


@router.get("/users", dependencies=[Depends(get_current_user)])
def list_users():
    return get_all_users()


@router.delete("/users/{username}", dependencies=[Depends(get_current_user)])
def remove_user(username: str):
    try:
        delete_user(username)
        return {"message": f"User '{username}' deleted"}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
