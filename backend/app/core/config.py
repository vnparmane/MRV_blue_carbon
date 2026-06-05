from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", extra="ignore"
    )

    blockchain_rpc_url: str = ""
    contract_address: str = ""
    blockchain_private_key: str = ""

    project_id: str = ""

    pinata_jwt: str = ""

    database_url: str = "sqlite:///./data/data.db"
    max_files: int = 20
    max_file_size_mb: int = 10
    cors_origins: list[str] = ["*"]


settings = Settings()
