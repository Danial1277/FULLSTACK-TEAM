from typing import Literal

from pydantic import BaseModel

Category = Literal["frontend", "backend"]


class Member(BaseModel):
    id: str
    name: str
    role: str
    category: Category
    does: list[str]
    tags: list[str]


class Structure(BaseModel):
    frontend: list[str]
    backend: list[str]


class RolesStats(BaseModel):
    frontend_count: int
    backend_count: int
    total_members: int


class TeamInfo(BaseModel):
    title: str
    description: str
    structure: Structure
    technologies: list[str]
    roles_stats: RolesStats
    work_principles: list[str]
    strengths: list[str]