Import os
import uvicorn
from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from data import TEAM_MEMBERS, TEAM_INFO

router = APIRouter()

class ContactMessage(BaseModel):
    name: str
    message: str

@router.get("/team")
def get_team():
    """Отдаёт общую информацию о команде."""
    return TEAM_INFO

@router.get("/members")
def get_members():
    """Отдаёт данные всех четырех участников."""
    return TEAM_MEMBERS

@router.get("/members/{member_id}")
def get_member(member_id: str):
    """Отдаёт данные одного конкретного участника."""
    member = next((m for m in TEAM_MEMBERS if m["id"] == member_id), None)
    if not member:
        raise HTTPException(status_code=404, detail="Участник не найден")
    return member

@router.post("/contact", status_code=201)
def contact(payload: ContactMessage):
    """Принимает сообщение из формы обратной связи на сайте."""
    name = payload.name.strip()
    message = payload.message.strip()

    if not name or not message:
        raise HTTPException(status_code=400, detail="Заполните имя и сообщение")

    # Сохраняем сообщение в лог-файл
    with open("messages.log", "a", encoding="utf-8") as f:
        f.write(f"Имя: {name} | Сообщение: {message}\n")

    return {"status": "ok", "detail": "Сообщение успешно сохранено"}


# Инициализация приложения FastAPI
app = FastAPI(title="Python Team Project API")

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Создаем папку для загрузок на всякий случай
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Подключаем роуты API (без префикса, чтобы эндпоинты были /team, /members и т.д.)
app.include_router(router)

# Подключаем раздачу фронтенда из папки "frontend" (index.html, style.css, app.js)
# Убедитесь, что папка "frontend" лежит рядом с main.py
app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)