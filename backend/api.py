from fastapi import APIRouter, HTTPException

from data import MEMBERS, MEMBERS_BY_ID, TEAM_INFO
from models import Category, Member, TeamInfo

router = APIRouter(prefix="/api", tags=["team"])


@router.get("/members", response_model=list[Member])
def get_members(category: Category | None = None):
    """Список участников. Необязательный фильтр: ?category=frontend или ?category=backend"""
    if category is None:
        return MEMBERS
    return [member for member in MEMBERS if member["category"] == category]


@router.get("/members/{member_id}", response_model=Member)
def get_member(member_id: str):
    """Данные конкретного участника по ID"""
    member = MEMBERS_BY_ID.get(member_id)
    if member is None:
        raise HTTPException(status_code=404, detail="Участник не найден")
    return member


@router.get("/team", response_model=TeamInfo)
def get_team_info():
    """Общая информация о команде"""
    return TEAM_INFO