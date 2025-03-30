import sqlite3

conn = sqlite3.connect("database.db", check_same_thread=False)
conn.row_factory = sqlite3.Row


def init_db():
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            hashed_password TEXT NOT NULL
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS content(
            key TEXT PRIMARY KEY,
            section TEXT NOT NULL,
            name TEXT NOT NULL,
            value TEXT NOT NULL
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS employees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            position TEXT NOT NULL,
            position_full TEXT NOT NULL,
            industry TEXT NOT NULL,
            photo_url TEXT NOT NULL,
            experience TEXT,
            professional_competention TEXT
    );
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            contact_value TEXT NOT NULL
        );
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS abilities (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL, 
            description TEXT NOT NULL
        );
    """)

    conn.commit()
