from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/api")

# Пример данных
members_data = [
    {"id": 1, "name": "Участник 1", "role": "Backend", "bio": "Описание 1"},
    {"id": 2, "name": "Участник 2", "role": "Backend", "bio": "Описание 2"},
    {"id": 3, "name": "Участник 3", "role": "Frontend", "bio": "Описание 3"},
    {"id": 4, "name": "Участник 4", "role": "Frontend", "bio": "Описание 4"},
    {"id": 5, "name": "Участник 5", "role": "Lead", "bio": "Описание 5"},
]

@router.get("/team")
async def get_team():
    return {"team_name": "FULLSTACK-TEAM", "count": len(members_data)}

@router.get("/members")
async def get_members():
    return members_data