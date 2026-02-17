from fastapi import APIRouter, HTTPException, Query
from models import FAQ, FAQCreate
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List
import os

router = APIRouter(prefix="/faq", tags=["FAQ"])

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'arsys_db')]
faq_collection = db.faq


@router.get("", response_model=List[FAQ])
async def get_faqs(
    limit: int = Query(50, le=100)
):
    """
    Ottiene tutte le FAQ ordinate per 'order'
    
    Query params:
        - limit: Numero massimo di FAQ
        
    Esempio: GET /api/faq
    """
    faqs = await faq_collection.find().sort("order", 1).limit(limit).to_list(limit)
    return [FAQ(**faq) for faq in faqs]


@router.get("/{faq_id}", response_model=FAQ)
async def get_faq(faq_id: str):
    """
    Ottiene una FAQ specifica per ID
    
    Esempio: GET /api/faq/123e4567-e89b-12d3-a456-426614174000
    """
    faq = await faq_collection.find_one({"id": faq_id})
    if not faq:
        raise HTTPException(status_code=404, detail="FAQ non trovata")
    return FAQ(**faq)


@router.post("", response_model=FAQ)
async def create_faq(faq_input: FAQCreate):
    """
    Crea una nuova FAQ (solo staff)
    
    TODO: Aggiungere autenticazione staff
    
    Body:
        - question: Domanda
        - answer: Risposta
        - order: Numero per ordinamento (opzionale)
        
    Esempio: POST /api/faq
    {
        "question": "Qual è l'età minima?",
        "answer": "Il minimo è 14 anni.",
        "order": 1
    }
    """
    faq = FAQ(
        question=faq_input.question,
        answer=faq_input.answer,
        order=faq_input.order
    )
    
    await faq_collection.insert_one(faq.dict())
    return faq


@router.put("/{faq_id}", response_model=FAQ)
async def update_faq(faq_id: str, faq_input: FAQCreate):
    """
    Aggiorna una FAQ esistente (solo staff)
    
    TODO: Aggiungere autenticazione staff
    
    Esempio: PUT /api/faq/123...
    """
    result = await faq_collection.update_one(
        {"id": faq_id},
        {"$set": {
            "question": faq_input.question,
            "answer": faq_input.answer,
            "order": faq_input.order
        }}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="FAQ non trovata")
    
    updated_faq = await faq_collection.find_one({"id": faq_id})
    return FAQ(**updated_faq)


@router.delete("/{faq_id}")
async def delete_faq(faq_id: str):
    """
    Elimina una FAQ (solo staff)
    
    TODO: Aggiungere autenticazione staff
    
    Esempio: DELETE /api/faq/123...
    """
    result = await faq_collection.delete_one({"id": faq_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="FAQ non trovata")
    
    return {"message": "FAQ eliminata"}


@router.post("/reorder")
async def reorder_faqs(order_map: dict):
    """
    Riordina le FAQ
    
    Body esempio:
    {
        "faq_id_1": 1,
        "faq_id_2": 2,
        "faq_id_3": 3
    }
    
    Esempio: POST /api/faq/reorder
    """
    for faq_id, order in order_map.items():
        await faq_collection.update_one(
            {"id": faq_id},
            {"$set": {"order": order}}
        )
    
    return {"message": f"Riordinate {len(order_map)} FAQ"}


@router.get("/search/query")
async def search_faqs(q: str = Query(..., description="Testo da cercare")):
    """
    Cerca nelle FAQ
    
    Query params:
        - q: Testo da cercare (case-insensitive)
        
    Esempio: GET /api/faq/search/query?q=età
    """
    faqs = await faq_collection.find({
        "$or": [
            {"question": {"$regex": q, "$options": "i"}},
            {"answer": {"$regex": q, "$options": "i"}}
        ]
    }).to_list(50)
    
    return [FAQ(**faq) for faq in faqs]
