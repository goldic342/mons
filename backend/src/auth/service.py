from passlib.hash import bcrypt
from src.database import conn


def create_user(username: str, password: str):
    """Создаём пользователя в БД. Если username уже есть, выбрасываем исключение."""
    c = conn.cursor()
    c.execute("SELECT id FROM users WHERE username = ?", (username,))
    row = c.fetchone()
    if row:
        raise ValueError(f"User '{username}' already exists")

    hashed_password = bcrypt.hash(password)
    c.execute(
        "INSERT INTO users (username, hashed_password) VALUES (?, ?)",
        (username, hashed_password),
    )
    conn.commit()


def get_user_by_username(username: str) -> dict | None:
    c = conn.cursor()
    c.execute("SELECT * FROM users WHERE username = ?", (username,))
    row = c.fetchone()
    return dict(row) if row else None


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.verify(plain_password, hashed_password)
