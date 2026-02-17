from fastapi import APIRouter, HTTPException
from services.discord_service import discord_service
from models import ServerStats, StaffMember
from typing import List
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/discord", tags=["Discord"])


@router.get("/stats", response_model=ServerStats)
async def get_server_stats():
    """
    Ottiene statistiche live del server Discord
    
    Returns:
        - total_members: Membri totali (inclusi bot)
        - real_members: Solo membri reali
        - bots: Numero di bot
        - online_members: Membri online ora
        
    Esempio: GET /api/discord/stats
    """
    stats = await discord_service.get_server_stats()
    
    if not stats:
        # Fallback ai dati mock se Discord API non è configurata
        logger.warning("Using mock data for server stats")
        return ServerStats(
            total_members=1652,
            real_members=1610,
            bots=42,
            online_members=234
        )
    
    return stats


@router.get("/staff", response_model=List[StaffMember])
async def get_staff_members():
    """
    Ottiene lista staff members con status Discord reale
    
    Returns:
        Lista di staff members con:
        - id: Discord user ID
        - username: Username Discord
        - avatar: Avatar hash
        - status: online/idle/dnd/offline
        - role: Admin/Moderator/Helper
        
    Esempio: GET /api/discord/staff
    """
    staff = await discord_service.get_staff_members()
    
    if not staff:
        # Fallback ai dati mock
        logger.warning("Using mock data for staff members")
        return [
            StaffMember(
                id="938782498144522251",
                username="Paperella (Developer)",
                discriminator="0",
                avatar=None,
                status="online",
                role="Developer"
            ),
            StaffMember(
                id="1009835584677740677",
                username="Missy",
                discriminator="0",
                avatar=None,
                status="idle",
                role="Owner"
            ),
            StaffMember(
                id="1413553252946935990",
                username="EnolaSposata",
                discriminator="0",
                avatar=None,
                status="online",
                role="Moderator"
            ),
            StaffMember(
                id="706233542924959873",
                username="OhNikx (creatore del sito)",
                discriminator="0",
                avatar=None,
                status="dnd",
                role="Helper"
            ),
            StaffMember(
                id="1356496295052972112",
                username="Ruan {Trial Staff}",
                discriminator="0",
                avatar=None,
                status="offline",
                role="Helper"
            )
        ]
    
    return staff


@router.post("/cache/clear")
async def clear_cache():
    """
    Pulisce la cache Discord (forza refresh dati)
    
    Utile per testing o aggiornamenti immediati
    """
    discord_service.clear_cache()
    return {"message": "Cache cleared successfully"}
