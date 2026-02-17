
Action: file_editor create /app/backend/models.py --file-text "from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
import uuid


# ===== REVIEW MODELS =====
class ReviewCreate(BaseModel):
    \"\"\"Schema per creare una nuova recensione\"\"\"
    author: str
    rating: int = Field(..., ge=1, le=5)  # da 1 a 5 stelle
    text: str
    
class Review(BaseModel):
    \"\"\"Schema recensione completo\"\"\"
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    author: str
    rating: int
    text: str
    date: datetime = Field(default_factory=datetime.utcnow)
    approved: bool = False  # Staff deve approvare prima che appaia
    
    class Config:
        json_schema_extra = {
            \"example\": {
                \"id\": \"123e4567-e89b-12d3-a456-426614174000\",
                \"author\": \"Marco_95\",
                \"rating\": 5,
                \"text\": \"Server fantastico!\",
                \"date\": \"2025-12-15T10:30:00\",
                \"approved\": True
            }
        }


# ===== EVENT MODELS =====
class EventCreate(BaseModel):
    \"\"\"Schema per creare un nuovo evento\"\"\"
    title: str
    description: str
    date: datetime
    event_type: str  # \"movie\", \"gaming\", \"special\", etc.
    
class Event(BaseModel):
    \"\"\"Schema evento completo\"\"\"
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    date: datetime
    event_type: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        json_schema_extra = {
            \"example\": {
                \"id\": \"123e4567-e89b-12d3-a456-426614174000\",
                \"title\": \"Serata Film\",
                \"description\": \"Guardiamo insieme un film scelto dalla community\",
                \"date\": \"2025-12-20T20:00:00\",
                \"event_type\": \"movie\"
            }
        }


# ===== FAQ MODELS =====
class FAQCreate(BaseModel):
    \"\"\"Schema per creare una nuova FAQ\"\"\"
    question: str
    answer: str
    order: int = 0  # Per ordinare le FAQ
    
class FAQ(BaseModel):
    \"\"\"Schema FAQ completo\"\"\"
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    question: str
    answer: str
    order: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        json_schema_extra = {
            \"example\": {
                \"id\": \"123e4567-e89b-12d3-a456-426614174000\",
                \"question\": \"Qual è l'età minima?\",
                \"answer\": \"Il minimo di età è 14 anni.\",
                \"order\": 1
            }
        }


# ===== DISCORD MODELS =====
class ServerStats(BaseModel):
    \"\"\"Statistiche del server Discord\"\"\"
    total_members: int
    real_members: int
    bots: int
    online_members: int
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class StaffMember(BaseModel):
    \"\"\"Membro dello staff con info Discord\"\"\"
    id: str
    username: str
    discriminator: str = \"0\"
    avatar: Optional[str] = None
    status: str  # \"online\", \"idle\", \"dnd\", \"offline\"
    role: str  # \"Admin\", \"Moderator\", \"Helper\"
    
    class Config:
        json_schema_extra = {
            \"example\": {
                \"id\": \"938782498144522251\",
                \"username\": \"StaffMember\",
                \"discriminator\": \"1234\",
                \"avatar\": \"avatar_hash_here\",
                \"status\": \"online\",
                \"role\": \"Admin\"
            }
        }


class DiscordConfig(BaseModel):
    \"\"\"Configurazione Discord (da .env)\"\"\"
    bot_token: str
    guild_id: str  # ID del server Arsys
    staff_ids: List[str]  # Lista degli ID degli staff members
"
Observation: Create successful: /app/backend/models.py