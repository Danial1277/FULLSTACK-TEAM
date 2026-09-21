import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from api import router as api_router






# Папка frontend лежит рядом с backend
FRONTEND_DIR = Path(__file__).resolve().parent.parent / "frontend"

app = FastAPI(title="Team Backend API")

# API подключаем первым, чтобы /api/* не перехватывался статикой
app.include_router(api_router)

# html=True: на "/" автоматически отдаётся index.html, остальные файлы (css/js) — как есть
app.mount("/", StaticFiles(directory=FRONTEND_DIR, html=True), name="frontend")

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)