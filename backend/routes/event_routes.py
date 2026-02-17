from fastapi import APIRouter, HTTPException, Query
from models import Event, EventCreate
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List, Optional
from datetime import datetime
import os

router = APIRouter(prefix="/events", tags=["Events"])

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'arsys_db')]
events_collection = db.events


@router.get("", response_model=List[Event])
async def get_events(
    upcoming_only: bool = Query(True, description="Mostra solo eventi futuri"),
    event_type: Optional[str] = Query(None, description="Filtra per tipo evento"),
    limit: int = Query(50, le=100)
):
    """
    Ottiene tutti gli eventi
    
    Query params:
        - upcoming_only: True per vedere solo eventi futuri (default)
        - event_type: Filtra per tipo (movie, gaming, special, etc.)
        - limit: Numero massimo di eventi
        
    Esempio: GET /api/events?upcoming_only=true&event_type=movie
    """
    query = {}
    
    if upcoming_only:
        query["date"] = {"$gte": datetime.utcnow()}
    
    if event_type:
        query["event_type"] = event_type
    
    events = await events_collection.find(query).sort("date", 1).limit(limit).to_list(limit)
    return [Event(**event) for event in events]


@router.get("/{event_id}", response_model=Event)
async def get_event(event_id: str):
    """
    Ottiene un evento specifico per ID
    
    Esempio: GET /api/events/123e4567-e89b-12d3-a456-426614174000
    """
    event = await events_collection.find_one({"id": event_id})
    if not event:
        raise HTTPException(status_code=404, detail="Evento non trovato")
    return Event(**event)


@router.post("", response_model=Event)
async def create_event(event_input: EventCreate):
    """
    Crea un nuovo evento (solo staff)
    
    TODO: Aggiungere autenticazione staff
    
    Body:
        - title: Titolo evento
        - description: Descrizione
        - date: Data e ora evento (ISO format)
        - event_type: Tipo evento (movie, gaming, special, etc.)
        
    Esempio: POST /api/events
    {
        "title": "Serata Film",
        "description": "Guardiamo insieme un film!",
        "date": "2025-12-20T20:00:00",
        "event_type": "movie"
    }
    """
    event = Event(
        title=event_input.title,
        description=event_input.description,
        date=event_input.date,
        event_type=event_input.event_type
    )
    
    await events_collection.insert_one(event.dict())
    return event


@router.put("/{event_id}", response_model=Event)
async def update_event(event_id: str, event_input: EventCreate):
    """
    Aggiorna un evento esistente (solo staff)
    
    TODO: Aggiungere autenticazione staff
    
    Esempio: PUT /api/events/123...
    """
    result = await events_collection.update_one(
        {"id": event_id},
        {"$set": {
            "title": event_input.title,
            "description": event_input.description,
            "date": event_input.date,
            "event_type": event_input.event_type
        }}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Evento non trovato")
    
    updated_event = await events_collection.find_one({"id": event_id})
    return Event(**updated_event)


@router.delete("/{event_id}")
async def delete_event(event_id: str):
    """
    Elimina un evento (solo staff)
    
    TODO: Aggiungere autenticazione staff
    
    Esempio: DELETE /api/events/123...
    """
    result = await events_collection.delete_one({"id": event_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Evento non trovato")
    
    return {"message": "Evento eliminato"}


@router.get("/types/list")
async def get_event_types():
    """
    Ottiene lista dei tipi di eventi disponibili
    
    Esempio: GET /api/events/types/list
    """
    return {
        "event_types": [
            {"value": "movie", "label": "Serata Film"},
            {"value": "anime", "label": "Serata Anime"},
            {"value": "gaming", "label": "Gaming Session"},
            {"value": "special", "label": "Evento Speciale"},
            {"value": "community", "label": "Community Event"},
            {"value": "giveaway", "label": "Giveaway"}
        ]
    }


@router.get("/stats/summary")
async def get_event_stats():
    """
    Ottiene statistiche sugli eventi
    
    Esempio: GET /api/events/stats/summary
    """
    total = await events_collection.count_documents({})
    upcoming = await events_collection.count_documents({
        "date": {"$gte": datetime.utcnow()}
    })
    past = total - upcoming
    
    return {
        "total": total,
        "upcoming": upcoming,
        "past": past
    }
