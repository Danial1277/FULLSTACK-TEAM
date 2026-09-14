
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from data import TEAM_MEMBERS, TEAM_INFO

router = APIRouter()


class ContactMessage(BaseModel):
    name: str
    message: str


@router.get("/team")
def get_team():
    """Отдаёт данные всех участников — для 4 личных вкладок."""
    return TEAM_MEMBERS


@router.get("/team/{member_id}")
def get_member(member_id: str):
    """Отдаёт данные одного участника по id (member1..member4)."""
    member = next((m for m in TEAM_MEMBERS if m["id"] == member_id), None)
    if not member:
        raise HTTPException(status_code=404, detail="Участник не найден")
    return member


@router.get("/team-info")
def get_team_info():
    """Отдаёт общую информацию о команде — для 5-й вкладки."""
    return TEAM_INFO


@router.post("/contact", status_code=201)
def contact(payload: ContactMessage):
    """Принимает сообщение из формы обратной связи (если она есть на сайте)."""
    name = payload.name.strip()
    message = payload.message.strip()

    if not name or not message:
        raise HTTPException(status_code=400, detail="Заполните имя и сообщение")

    with open("messages.log", "a", encoding="utf-8") as f:
        f.write(f"{name}: {message}\n")

    return {"status": "ok"}