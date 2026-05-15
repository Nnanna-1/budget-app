from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class BudgetProfile(Base):
    __tablename__ = "budget_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, unique=True)
    monthly_income = Column(Float, nullable=False)
    budgeting_style = Column(String, nullable=False)
    savings_goal = Column(Float, nullable=False)
    goal_name = Column(String, nullable=False)

    user = relationship("User", back_populates="budget_profile")