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
    return c.lastrowid


def get_user_by_username(username: str) -> dict | None:
    c = conn.cursor()
    c.execute("SELECT * FROM users WHERE username = ?", (username,))
    row = c.fetchone()
    return dict(row) if row else None


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.verify(plain_password, hashed_password)


def get_all_users() -> list[dict]:
    c = conn.cursor()
    c.execute("SELECT id, username FROM users")
    rows = c.fetchall()
    return [dict(row) for row in rows]


def delete_user(user_id: str):
    c = conn.cursor()
    c.execute("SELECT id FROM users WHERE id = ?", (user_id,))
    row = c.fetchone()
    if not row:
        raise ValueError(f"User '{user_id}' not found")

    c.execute("DELETE FROM users WHERE id = ?", (user_id,))
    conn.commit()
