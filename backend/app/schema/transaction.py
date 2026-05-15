from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TransactionCreate(BaseModel):
    amount: float
    category: str
    description: Optional[str] = None
    transaction_type: str

class TransactionResponse(BaseModel):
    id: int
    user_id: int
    amount: float
    category: str
    description: Optional[str] = None
    transaction_type: str
    created_at: datetime

    class Config:
        from_attributes = True