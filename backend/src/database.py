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
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            key TEXT,
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

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL, 
            tags TEXT NOT NULL,
            type TEXT NOT NULL,
            reading_time INTEGER NOT NULL,
            thumbnail_url TEXT NOT NULL,
            calls_section TEXT NOT NULL,
            analyzis_section TEXT NOT NULL,
            values_section TEXT NOT NULL,
            mission_section TEXT NOT NULL,
            distribution_section TEXT NOT NULL
        );
    """)

    cursor.execute(""" 
        CREATE TABLE IF NOT EXISTS project_contents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            project_id INTEGER NOT NULL,
            content_url TEXT NOT NULL,
            FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
        );
    """)
    conn.commit()
