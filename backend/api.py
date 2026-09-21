from fastapi import APIRouter, HTTPException
from data import MEMBERS, TEAM_INFO

router = APIRouter(prefix="/api")

@router.get("/members")
def get_members():
    """Получить список всех участников"""
    return MEMBERS

@router.get("/members/{member_id}")
def get_member(member_id: str):
    """Получить данные конкретного участника по ID"""
    for member in MEMBERS:
        if member["id"] == member_id:
            return member
    raise HTTPException(status_code=404, detail="Member not found")

@router.get("/team")
def get_team_info():
    """Получить общую информацию о команде"""
    return TEAM_INFO
