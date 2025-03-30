from fastapi import APIRouter, Request, HTTPException, Depends
from src.auth.service import (
    get_user_by_username,
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
    return {"message": f"Hello {user['username']}, you're logged in."}


@router.post("/logout")
def logout(req: Request):
    req.session.pop("user_id", None)
    return {"message": "Logged out"}


@router.post("/register")
def register(
    form: RegisterRequest,
    user_id: int = Depends(get_current_user),
):
    try:
        create_user(form.username, form.password)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    return {"message": f"User '{form.username}' successfully created"}
