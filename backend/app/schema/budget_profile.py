from pydantic import BaseModel
from typing import Optional

class BudgetProfileCreate(BaseModel):
    monthly_income: float
    budgeting_style: str
    savings_goal: float
    goal_name: str

class BudgetProfileResponse(BaseModel):
    id: int
    user_id: int
    monthly_income: float
    budgeting_style: str
    savings_goal: float
    goal_name: str

    class Config:
        from_attributes = True