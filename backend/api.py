from fastapi import APIRouter, HTTPException
from data import MEMBERS, TEAM_INFO
from models import Member, TeamInfo

router = APIRouter(prefix="/api", tags=["Team API"])


@router.get("/members", response_model=list[Member], summary="Получить список всех участников")
def get_members():
    return MEMBERS


@router.get("/members/{member_id}", response_model=Member, summary="Получить участника по ID")
def get_member(member_id: str):
    member = next((m for m in MEMBERS if m["id"] == member_id), None)
    if not member:
        raise HTTPException(status_code=404, detail=f"Участник '{member_id}' не найден")
    return member


@router.get("/team", response_model=TeamInfo, summary="Получить информацию о команде")
def get_team_info():
    return TEAM_INFO