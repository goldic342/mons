from os import path
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    SESSION_KEY: str
    ADMIN_LOGIN: str
    ADMIN_PASSWORD: str
    BACKEND_URL: str
    BOT_TOKEN: str
    CHAT_ID: str
    CONTACT_RATELIMIT: int = 1800

    model_config = SettingsConfigDict(
        case_sensitive=True,
        env_file=".env" if path.exists(".env") else "./backend/.env",
    )


settings = Settings()
