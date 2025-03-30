from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from src.database import init_db
from src.auth.router import router as auth_router
from src.auth.service import get_user_by_username, create_user

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(SessionMiddleware, secret_key="SUPER_SECRET_KEY")


@app.on_event("startup")
def on_startup():
    init_db()
    create_default_admin()


def create_default_admin():
    """Создать пользователя admin:admin, если его нет."""
    user = get_user_by_username("admin")
    if not user:
        create_user("admin", "admin")  # пароль "admin"
        print("Created default admin user: admin/admin")
    else:
        print("Admin user already exists.")


app.include_router(auth_router)
