import os
from src.config import settings
from uuid import uuid4
from fastapi import UploadFile


def save_file(path: str, upload_file: UploadFile) -> str:
    path = os.path.join("/media", path)

    os.makedirs(f".{path}", exist_ok=True)

    ext = os.path.splitext(upload_file.filename)[1]  # type: ignore
    filename = f"{uuid4().hex}{ext}"
    filepath = os.path.join(path, filename)  # type: ignore

    with open(f".{filepath}", "wb") as f:
        f.write(upload_file.file.read())

    return f"{settings.BACKEND_URL}{filepath}"
