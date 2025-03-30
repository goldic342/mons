from fastapi import FastAPI
from os import getenv
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from src.content.default_content import load_default_content
from src.database import init_db
from src.auth.router import router as auth_router
from src.content.router import router as content_router
from src.auth.service import get_user_by_username, create_user
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(SessionMiddleware, secret_key=getenv("SESSION_KEY") or "KEY")


@app.on_event("startup")
def on_startup():
    init_db()
    create_default_admin()
    load_default_content()


def create_default_admin():
    user = get_user_by_username("admin")
    if not user:
        create_user(
            getenv("ADMIN_LOGIN") or "admin", getenv("ADMIN_PASSWORD") or "admin"
        )
        print("Created default admin user: admin/admin")
    else:
        print("Admin user already exists.")


app.include_router(auth_router)
app.include_router(content_router)
