import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

from src.config import settings
from src.database import init_db
from src.auth.service import get_user_by_username, create_user
from src.content.defaults import load_default_content

from src.auth.router import router as auth_router
from src.content.router import router as content_router
from src.employees.router import router as employee_router
from src.contacts.router import router as contacts_router
from src.abilities.router import router as abilities_router
from src.projects.private_router import router as private_projects_router
from src.projects.public_router import router as public_projects_router

load_dotenv()
os.makedirs("./media", exist_ok=True)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # update as needed
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(SessionMiddleware, secret_key=settings.SESSION_KEY)

app.mount("/media", StaticFiles(directory="media"), name="media")


@app.on_event("startup")
def on_startup():
    init_db()
    create_default_admin()
    load_default_content()


def create_default_admin():
    user = get_user_by_username("admin")
    if not user:
        create_user(settings.ADMIN_LOGIN, settings.ADMIN_PASSWORD)
        print("^_^ Created default admin user: admin/admin")
    else:
        print("@_@ Admin user already exists.")


app.include_router(auth_router)
app.include_router(content_router)
app.include_router(employee_router)
app.include_router(contacts_router)
app.include_router(abilities_router)
app.include_router(public_projects_router)
app.include_router(private_projects_router)
