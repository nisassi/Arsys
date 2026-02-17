import os
import aiohttp
from typing import Optional, List, Dict
from datetime import datetime, timedelta
from models import ServerStats, StaffMember
import logging

logger = logging.getLogger(__name__)


class DiscordService:
    """
    Servizio per interagire con l'API Discord
    
    SETUP RICHIESTO:
    1. Crea un bot Discord su https://discord.com/developers/applications
    2. Abilita "Server Members Intent" nelle impostazioni del bot
    3. Invita il bot nel tuo server con permessi "Read Members"
    4. Aggiungi le seguenti variabili nel file .env:
       - DISCORD_BOT_TOKEN=your_bot_token_here
       - DISCORD_GUILD_ID=1234567890 (ID del server Arsys)
    """
    
    def __init__(self):
        self.bot_token = os.getenv("DISCORD_BOT_TOKEN")
        self.guild_id = os.getenv("DISCORD_GUILD_ID")
        self.base_url = "https://discord.com/api/v10"
        
        # IDs degli staff members (dal mock.js)
        self.staff_ids = [
            "938782498144522251",
            "1009835584677740677",
            "1413553252946935990",
            "706233542924959873",
            "1356496295052972112"
        ]
        
        # Roles mapping (puoi personalizzare)
        self.staff_roles = {
            "938782498144522251": "Admin",
            "1009835584677740677": "Moderator",
            "1413553252946935990": "Moderator",
            "706233542924959873": "Helper",
            "1356496295052972112": "Helper"
        }
        
        # Cache per ridurre chiamate API
        self.cache: Dict[str, any] = {}
        self.cache_duration = timedelta(minutes=5)
    
    def _get_headers(self) -> dict:
        """Headers per le richieste Discord API"""
        return {
            "Authorization": f"Bot {self.bot_token}",
            "Content-Type": "application/json"
        }
    
    def _is_cache_valid(self, key: str) -> bool:
        """Controlla se la cache è ancora valida"""
        if key not in self.cache:
            return False
        cached_time = self.cache[key].get("timestamp")
        if not cached_time:
            return False
        return datetime.utcnow() - cached_time < self.cache_duration
    
    async def get_server_stats(self) -> Optional[ServerStats]:
        """
        Ottiene le statistiche del server (membri totali, online, bot, ecc)
        
        Returns:
            ServerStats o None se errore
        """
        # Controlla cache
        cache_key = "server_stats"
        if self._is_cache_valid(cache_key):
            logger.info("Returning cached server stats")
            return self.cache[cache_key]["data"]
        
        if not self.bot_token or not self.guild_id:
            logger.warning("Discord bot token or guild ID not configured")
            return None
        
        try:
            async with aiohttp.ClientSession() as session:
                # Get guild info
                guild_url = f"{self.base_url}/guilds/{self.guild_id}?with_counts=true"
                async with session.get(guild_url, headers=self._get_headers()) as resp:
                    if resp.status != 200:
                        logger.error(f"Discord API error: {resp.status}")
                        return None
                    
                    data = await resp.json()
                    
                    # Calcola statistiche
                    total_members = data.get("approximate_member_count", 0)
                    online_members = data.get("approximate_presence_count", 0)
                    
                    # Stima bot (circa 2-3% in media, puoi raffinare)
                    estimated_bots = int(total_members * 0.026)  # 2.6% come da tuo dato
                    real_members = total_members - estimated_bots
                    
                    stats = ServerStats(
                        total_members=total_members,
                        real_members=real_members,
                        bots=estimated_bots,
                        online_members=online_members
                    )
                    
                    # Salva in cache
                    self.cache[cache_key] = {
                        "data": stats,
                        "timestamp": datetime.utcnow()
                    }
                    
                    logger.info(f"Server stats fetched: {total_members} members")
                    return stats
                    
        except Exception as e:
            logger.error(f"Error fetching server stats: {str(e)}")
            return None
    
    async def get_staff_members(self) -> List[StaffMember]:
        """
        Ottiene informazioni sugli staff members con status reale
        
        Returns:
            Lista di StaffMember
        """
        # Controlla cache
        cache_key = "staff_members"
        if self._is_cache_valid(cache_key):
            logger.info("Returning cached staff members")
            return self.cache[cache_key]["data"]
        
        if not self.bot_token or not self.guild_id:
            logger.warning("Discord bot token or guild ID not configured")
            return []
        
        staff_list = []
        
        try:
            async with aiohttp.ClientSession() as session:
                for staff_id in self.staff_ids:
                    try:
                        # Get member info
                        member_url = f"{self.base_url}/guilds/{self.guild_id}/members/{staff_id}"
                        async with session.get(member_url, headers=self._get_headers()) as resp:
                            if resp.status != 200:
                                logger.warning(f"Could not fetch staff member {staff_id}")
                                continue
                            
                            member_data = await resp.json()
                            user = member_data.get("user", {})
                            
                            # Get presence (status)
                            # Nota: Per presence serve il Gateway, qui useremo un fallback
                            # Se vuoi presence real-time, devi usare discord.py con Gateway
                            status = "offline"  # Default, aggiorna con Gateway
                            
                            staff_member = StaffMember(
                                id=staff_id,
                                username=user.get("username", "Unknown"),
                                discriminator=user.get("discriminator", "0"),
                                avatar=user.get("avatar"),
                                status=status,
                                role=self.staff_roles.get(staff_id, "Helper")
                            )
                            
                            staff_list.append(staff_member)
                            
                    except Exception as e:
                        logger.error(f"Error fetching staff {staff_id}: {str(e)}")
                        continue
                
                # Salva in cache
                self.cache[cache_key] = {
                    "data": staff_list,
                    "timestamp": datetime.utcnow()
                }
                
                logger.info(f"Fetched {len(staff_list)} staff members")
                return staff_list
                
        except Exception as e:
            logger.error(f"Error fetching staff members: {str(e)}")
            return []
    
    async def get_user_by_id(self, user_id: str) -> Optional[dict]:
        """
        Ottiene info su un utente specifico
        
        Args:
            user_id: Discord user ID
            
        Returns:
            Dict con info utente o None
        """
        if not self.bot_token:
            return None
        
        try:
            async with aiohttp.ClientSession() as session:
                user_url = f"{self.base_url}/users/{user_id}"
                async with session.get(user_url, headers=self._get_headers()) as resp:
                    if resp.status != 200:
                        return None
                    return await resp.json()
        except Exception as e:
            logger.error(f"Error fetching user {user_id}: {str(e)}")
            return None
    
    def clear_cache(self):
        """Pulisce la cache (utile per testing o refresh manuale)"""
        self.cache = {}
        logger.info("Cache cleared")


# Singleton instance
discord_service = DiscordService()
