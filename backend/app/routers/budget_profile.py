from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.budget_profile import BudgetProfile
from app.schema.budget_profile import BudgetProfileCreate, BudgetProfileResponse
from app.oauth2 import get_current_user
from app.models.user import User

router = APIRouter(prefix="/budget-profile", tags=["Budget Profile"])

@router.post("/", response_model=BudgetProfileResponse, status_code=201)
def create_budget_profile(profile: BudgetProfileCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    existing = db.query(BudgetProfile).filter(BudgetProfile.user_id == current_user.id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Budget profile already exists")
    new_profile = BudgetProfile(**profile.model_dump(), user_id=current_user.id)
    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)
    return new_profile

@router.get("/", response_model=BudgetProfileResponse)
def get_budget_profile(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    profile = db.query(BudgetProfile).filter(BudgetProfile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Budget profile not found")
    return profile

@router.put("/", response_model=BudgetProfileResponse)
def update_budget_profile(profile: BudgetProfileCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    existing = db.query(BudgetProfile).filter(BudgetProfile.user_id == current_user.id).first()
    if not existing:
        raise HTTPException(status_code=404, detail="Budget profile not found")
    for key, value in profile.model_dump().items():
        setattr(existing, key, value)
    db.commit()
    db.refresh(existing)
    return existing