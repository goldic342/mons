from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from src.content.default_content import load_default_content
from src.database import init_db
from src.auth.router import router as auth_router
from src.employees.router import router as employee_router
from src.content.router import router as content_router
from src.auth.service import get_user_by_username, create_user
from dotenv import load_dotenv
from src.config import settings

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(SessionMiddleware, secret_key=settings.SESSION_KEY)


@app.on_event("startup")
def on_startup():
    init_db()
    create_default_admin()
    load_default_content()


app.mount("/media", StaticFiles(directory="media"), name="media")


def create_default_admin():
    user = get_user_by_username("admin")
    if not user:
        create_user(settings.ADMIN_LOGIN, settings.ADMIN_PASSWORD)
        print("Created default admin user: admin/admin")
    else:
        print("Admin user already exists.")


app.include_router(auth_router)
app.include_router(content_router)
app.include_router(employee_router)
