from fastapi import FastAPI
from app.database import Base, engine
from app.routers import auth, budget_profile, transaction

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth.router)
app.include_router(budget_profile.router)
app.include_router(transaction.router)

@app.get("/")
def root():
    return {"message": "Budget App API is running"}