from fastapi import APIRouter, HTTPException, Query
from models import Review, ReviewCreate
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List
import os
from datetime import datetime

router = APIRouter(prefix="/reviews", tags=["Reviews"])

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'arsys_db')]
reviews_collection = db.reviews


@router.get("", response_model=List[Review])
async def get_reviews(
    approved_only: bool = Query(True, description="Mostra solo recensioni approvate"),
    limit: int = Query(50, le=100, description="Numero massimo di recensioni")
):
    """
    Ottiene tutte le recensioni
    
    Query params:
        - approved_only: True per vedere solo recensioni approvate (default)
        - limit: Numero massimo di recensioni da ritornare
        
    Esempio: GET /api/reviews?approved_only=true&limit=10
    """
    query = {}
    if approved_only:
        query["approved"] = True
    
    reviews = await reviews_collection.find(query).sort("date", -1).limit(limit).to_list(limit)
    return [Review(**review) for review in reviews]


@router.get("/{review_id}", response_model=Review)
async def get_review(review_id: str):
    """
    Ottiene una recensione specifica per ID
    
    Esempio: GET /api/reviews/123e4567-e89b-12d3-a456-426614174000
    """
    review = await reviews_collection.find_one({"id": review_id})
    if not review:
        raise HTTPException(status_code=404, detail="Recensione non trovata")
    return Review(**review)


@router.post("", response_model=Review)
async def create_review(review_input: ReviewCreate):
    """
    Crea una nuova recensione
    
    Body:
        - author: Nome dell'autore
        - rating: Valutazione da 1 a 5
        - text: Testo della recensione
        
    Nota: Le recensioni vengono create come non approvate.
    Lo staff deve approvarle manualmente.
    
    Esempio: POST /api/reviews
    {
        "author": "Marco_95",
        "rating": 5,
        "text": "Server fantastico!"
    }
    """
    # Crea recensione (non approvata di default)
    review = Review(
        author=review_input.author,
        rating=review_input.rating,
        text=review_input.text,
        approved=False  # Staff deve approvare
    )
    
    await reviews_collection.insert_one(review.dict())
    return review


@router.patch("/{review_id}/approve")
async def approve_review(review_id: str):
    """
    Approva una recensione (solo per staff)
    
    TODO: Aggiungere autenticazione staff
    
    Esempio: PATCH /api/reviews/123.../approve
    """
    result = await reviews_collection.update_one(
        {"id": review_id},
        {"$set": {"approved": True}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Recensione non trovata")
    
    return {"message": "Recensione approvata"}


@router.delete("/{review_id}")
async def delete_review(review_id: str):
    """
    Elimina una recensione (solo per staff)
    
    TODO: Aggiungere autenticazione staff
    
    Esempio: DELETE /api/reviews/123...
    """
    result = await reviews_collection.delete_one({"id": review_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Recensione non trovata")
    
    return {"message": "Recensione eliminata"}


@router.get("/stats/summary")
async def get_review_stats():
    """
    Ottiene statistiche sulle recensioni
    
    Returns:
        - total: Numero totale recensioni
        - approved: Recensioni approvate
        - pending: Recensioni in attesa
        - average_rating: Media valutazioni
        
    Esempio: GET /api/reviews/stats/summary
    """
    total = await reviews_collection.count_documents({})
    approved = await reviews_collection.count_documents({"approved": True})
    pending = total - approved
    
    # Calcola media rating
    pipeline = [
        {"$match": {"approved": True}},
        {"$group": {"_id": None, "avg": {"$avg": "$rating"}}}
    ]
    result = await reviews_collection.aggregate(pipeline).to_list(1)
    average_rating = round(result[0]["avg"], 1) if result else 0.0
    
    return {
        "total": total,
        "approved": approved,
        "pending": pending,
        "average_rating": average_rating
    }
