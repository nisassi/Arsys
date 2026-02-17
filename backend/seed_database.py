#!/usr/bin/env python3
"""
Script per popolare il database Arsys con dati iniziali
Esegui: python3 seed_database.py
"""

import asyncio
import sys
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

# Load environment
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'arsys_db')]


# === DATI INIZIALI ===

INITIAL_REVIEWS = [
    {
        "id": "review-1",
        "author": "Marco_95",
        "rating": 5,
        "text": "Server fantastico! L'atmosfera è super chill e ho conosciuto un sacco di persone simpatiche. Lo staff è sempre disponibile!",
        "date": "2025-12-15T10:30:00",
        "approved": True
    },
    {
        "id": "review-2",
        "author": "GamerGirl23",
        "rating": 5,
        "text": "Finalmente un server dove non c'è drama! Community accogliente e tanti eventi divertenti. Consigliatissimo 💚",
        "date": "2025-12-10T15:20:00",
        "approved": True
    },
    {
        "id": "review-3",
        "author": "Alex_Tech",
        "rating": 4,
        "text": "Ottimo server, molto organizzato. Le chat sono sempre attive e c'è sempre qualcuno con cui parlare.",
        "date": "2025-12-08T09:45:00",
        "approved": True
    },
    {
        "id": "review-4",
        "author": "Luna_Moon",
        "rating": 5,
        "text": "Adoro questo server! Lo staff è gentilissimo e l'ambiente è perfetto per fare nuove amicizie. Le serate film sono il top!",
        "date": "2025-12-05T18:30:00",
        "approved": True
    },
    {
        "id": "review-5",
        "author": "PizzaLover88",
        "rating": 5,
        "text": "Server super attivo e ben moderato. Zero toxic, solo vibes positive. Entrate, non ve ne pentirete!",
        "date": "2025-12-01T12:15:00",
        "approved": True
    },
    {
        "id": "review-6",
        "author": "NightOwl_",
        "rating": 4,
        "text": "Bella community, gente alla mano. Il sistema di livelli è motivante e gli eventi sono sempre ben organizzati.",
        "date": "2025-11-28T20:00:00",
        "approved": True
    }
]

INITIAL_FAQS = [
    {
        "id": "faq-1",
        "question": "Appena entrata mi sono chiesta qual'era il minimo d'età che si potesse avere!",
        "answer": "Il minimo di età per entrare nel server Arsys è **14 anni**. Questa regola è importante per mantenere un ambiente adatto a tutti i membri.",
        "order": 1,
        "created_at": "2025-12-01T10:00:00"
    },
    {
        "id": "faq-2",
        "question": "Come posso ottenere ruoli nel server?",
        "answer": "I ruoli vengono assegnati automaticamente in base alla tua attività nel server tramite il sistema di livelli. Più partecipi, più ruoli speciali puoi ottenere!",
        "order": 2,
        "created_at": "2025-12-01T10:05:00"
    },
    {
        "id": "faq-3",
        "question": "Cosa succede se infrangi le regole?",
        "answer": "Le infrazioni vengono gestite gradualmente: prima ricevi un richiamo, poi un timeout, e nei casi più gravi potresti essere bannato dal server.",
        "order": 3,
        "created_at": "2025-12-01T10:10:00"
    },
    {
        "id": "faq-4",
        "question": "Posso suggerire eventi o funzionalità?",
        "answer": "Assolutamente sì! Siamo sempre aperti a suggerimenti dalla community. Contatta lo staff per condividere le tue idee.",
        "order": 4,
        "created_at": "2025-12-01T10:15:00"
    },
    {
        "id": "faq-5",
        "question": "Come contatto lo staff?",
        "answer": "Puoi aprire un ticket nel server o menzionare uno staff member nei canali appropriati. Il nostro team è sempre disponibile ad aiutarti!",
        "order": 5,
        "created_at": "2025-12-01T10:20:00"
    }
]

INITIAL_EVENTS = [
    # Esempi di eventi - puoi personalizzarli
    {
        "id": "event-example-1",
        "title": "Serata Film - Coming Soon",
        "description": "Stiamo organizzando una serata film dove guarderemo insieme un film scelto dalla community! Resta sintonizzato per la data.",
        "date": "2025-12-25T20:00:00",
        "event_type": "movie",
        "created_at": "2025-12-15T10:00:00"
    }
]


async def seed_database():
    """Popola il database con dati iniziali"""
    
    print("🌱 Inizializzazione database Arsys...")
    print("-" * 50)
    
    # === REVIEWS ===
    print("\n📝 Popolamento Recensioni...")
    reviews_collection = db.reviews
    
    # Clear existing reviews (optional - rimuovi questo se vuoi mantenere le esistenti)
    # await reviews_collection.delete_many({})
    
    # Check if reviews already exist
    existing_reviews = await reviews_collection.count_documents({})
    if existing_reviews > 0:
        print(f"   ⚠️  Trovate {existing_reviews} recensioni esistenti. Salto inserimento.")
    else:
        await reviews_collection.insert_many(INITIAL_REVIEWS)
        print(f"   ✓ Inserite {len(INITIAL_REVIEWS)} recensioni")
    
    # === FAQ ===
    print("\n❓ Popolamento FAQ...")
    faq_collection = db.faq
    
    existing_faqs = await faq_collection.count_documents({})
    if existing_faqs > 0:
        print(f"   ⚠️  Trovate {existing_faqs} FAQ esistenti. Salto inserimento.")
    else:
        await faq_collection.insert_many(INITIAL_FAQS)
        print(f"   ✓ Inserite {len(INITIAL_FAQS)} FAQ")
    
    # === EVENTS ===
    print("\n📅 Popolamento Eventi...")
    events_collection = db.events
    
    existing_events = await events_collection.count_documents({})
    if existing_events > 0:
        print(f"   ⚠️  Trovati {existing_events} eventi esistenti. Salto inserimento.")
    else:
        await events_collection.insert_many(INITIAL_EVENTS)
        print(f"   ✓ Inseriti {len(INITIAL_EVENTS)} eventi")
    
    # === SUMMARY ===
    print("\n" + "=" * 50)
    print("✅ Database popolato con successo!")
    print("=" * 50)
    
    # Statistiche finali
    total_reviews = await reviews_collection.count_documents({})
    total_faqs = await faq_collection.count_documents({})
    total_events = await events_collection.count_documents({})
    
    print(f"\n📊 Stato attuale database:")
    print(f"   • Recensioni: {total_reviews}")
    print(f"   • FAQ: {total_faqs}")
    print(f"   • Eventi: {total_events}")
    
    print("\n🚀 Puoi ora testare le API:")
    print("   • GET /api/reviews")
    print("   • GET /api/faq")
    print("   • GET /api/events")
    
    client.close()


if __name__ == "__main__":
    try:
        asyncio.run(seed_database())
    except KeyboardInterrupt:
        print("\n\n⚠️  Operazione annullata dall'utente")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Errore: {str(e)}")
        sys.exit(1)
