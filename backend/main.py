import uvicorn
from api import router as api_router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

app = FastAPI(title="Multi-Tab Profile App")

# Разрешаем запросы с фронтенда (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Создаем папку uploads, если её нет
os.makedirs("uploads", exist_ok=True)

# Монтируем папку для загруженных фото
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Подключаем API маршруты из api.py
app.include_router(api_router)

# Монтируем фронтенд (HTML, CSS, JS)
# ВАЖНО: подключается последним, чтобы не перекрывать /api и /uploads
app.mount("/", StaticFiles(directory="../frontend", html=True), name="frontend")

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)