\# 🚀 Arsys Backend API - Setup Guide



\## 📋 Panoramica



Backend API per il sito del server Discord \*\*Arsys\*\*. Include integrazioni Discord, gestione recensioni, eventi e FAQ.



\## 🏗️ Struttura File



```

backend/

├── server.py                    # Main FastAPI application

├── models.py                    # Pydantic models per tutte le entità

├── services/

│   └── discord\_service.py      # Servizio per Discord API integration

├── routes/

│   ├── discord\_routes.py       # Endpoints Discord (/api/discord/\*)

│   ├── review\_routes.py        # Endpoints Recensioni (/api/reviews)

│   ├── event\_routes.py         # Endpoints Eventi (/api/events)

│   └── faq\_routes.py          # Endpoints FAQ (/api/faq)

└── .env                        # Configurazione (vedi sotto)

```



\## ⚙️ Setup Iniziale



\### 1. Variabili d'Ambiente (.env)



Aggiungi queste variabili nel file `/app/backend/.env`:



```bash

\# Database MongoDB (già configurato)

MONGO\_URL=mongodb://localhost:27017

DB\_NAME=arsys\_db



\# Discord Bot Configuration (DA AGGIUNGERE)

DISCORD\_BOT\_TOKEN=your\_bot\_token\_here

DISCORD\_GUILD\_ID=your\_server\_id\_here



\# CORS (opzionale)

CORS\_ORIGINS=\*

```



\### 2. Come Ottenere Discord Bot Token



1\. Vai su https://discord.com/developers/applications

2\. Clicca "New Application" e dai un nome (es. "Arsys Bot")

3\. Vai nella sezione \*\*Bot\*\* nel menu laterale

4\. Clicca "Add Bot"

5\. Sotto "Token", clicca "Reset Token" e copia il token

6\. \*\*IMPORTANTE\*\*: Abilita questi intents:

&nbsp;  - ✅ Server Members Intent

&nbsp;  - ✅ Presence Intent (per status online/offline)

7\. Vai in \*\*OAuth2 > URL Generator\*\*

8\. Seleziona scope: `bot`

9\. Seleziona permissions: `Read Messages/View Channels`

10\. Copia l'URL generato e invita il bot nel server Arsys



\### 3. Ottenere Guild ID (Server ID)



\*\*Metodo 1 - Da Discord:\*\*

1\. Abilita "Modalità Sviluppatore" in Discord:

&nbsp;  - Settings > Advanced > Developer Mode ON

2\. Torna al server Arsys

3\. Click destro sul nome del server → "Copia ID"



\*\*Metodo 2 - Da URL:\*\*

\- L'URL del server è: `discord.com/channels/GUILD\_ID/...`



\### 4. Restart Backend



Dopo aver aggiunto le variabili:

```bash

sudo supervisorctl restart backend

```



\## 📡 API Endpoints



\### Discord API



\#### GET `/api/discord/stats`

Statistiche server live (membri totali, online, bot)



\*\*Response:\*\*

```json

{

&nbsp; "total\_members": 1652,

&nbsp; "real\_members": 1610,

&nbsp; "bots": 42,

&nbsp; "online\_members": 234,

&nbsp; "updated\_at": "2025-12-15T10:30:00"

}

```



\#### GET `/api/discord/staff`

Lista staff con status real-time



\*\*Response:\*\*

```json

\[

&nbsp; {

&nbsp;   "id": "938782498144522251",

&nbsp;   "username": "StaffMember",

&nbsp;   "discriminator": "1234",

&nbsp;   "avatar": "avatar\_hash",

&nbsp;   "status": "online",

&nbsp;   "role": "Admin"

&nbsp; }

]

```



\#### POST `/api/discord/cache/clear`

Pulisce cache Discord (forza refresh)



---



\### Reviews API



\#### GET `/api/reviews`

Ottiene recensioni (solo approvate di default)



\*\*Query Params:\*\*

\- `approved\_only=true` - Solo recensioni approvate

\- `limit=50` - Numero massimo recensioni



\#### POST `/api/reviews`

Crea nuova recensione



\*\*Body:\*\*

```json

{

&nbsp; "author": "Marco\_95",

&nbsp; "rating": 5,

&nbsp; "text": "Server fantastico!"

}

```



\#### PATCH `/api/reviews/{review\_id}/approve`

Approva una recensione (staff only)



\#### DELETE `/api/reviews/{review\_id}`

Elimina recensione (staff only)



\#### GET `/api/reviews/stats/summary`

Statistiche recensioni (totale, media rating, ecc)



---



\### Events API



\#### GET `/api/events`

Ottiene eventi



\*\*Query Params:\*\*

\- `upcoming\_only=true` - Solo eventi futuri

\- `event\_type=movie` - Filtra per tipo



\#### POST `/api/events`

Crea nuovo evento (staff only)



\*\*Body:\*\*

```json

{

&nbsp; "title": "Serata Film",

&nbsp; "description": "Guardiamo insieme un film!",

&nbsp; "date": "2025-12-20T20:00:00",

&nbsp; "event\_type": "movie"

}

```



\#### PUT `/api/events/{event\_id}`

Aggiorna evento (staff only)



\#### DELETE `/api/events/{event\_id}`

Elimina evento (staff only)



\#### GET `/api/events/types/list`

Lista tipi di eventi disponibili



---



\### FAQ API



\#### GET `/api/faq`

Ottiene tutte le FAQ ordinate



\#### POST `/api/faq`

Crea nuova FAQ (staff only)



\*\*Body:\*\*

```json

{

&nbsp; "question": "Qual è l'età minima?",

&nbsp; "answer": "Il minimo è 14 anni.",

&nbsp; "order": 1

}

```



\#### PUT `/api/faq/{faq\_id}`

Aggiorna FAQ (staff only)



\#### DELETE `/api/faq/{faq\_id}`

Elimina FAQ (staff only)



\#### GET `/api/faq/search/query?q=età`

Cerca nelle FAQ



\#### POST `/api/faq/reorder`

Riordina FAQ



---



\## 🔧 Sviluppo



\### Test Endpoints Localmente



```bash

\# Test health check

curl http://localhost:8001/api/



\# Test Discord stats

curl http://localhost:8001/api/discord/stats



\# Test staff

curl http://localhost:8001/api/discord/staff

```



\### Documentazione Interattiva



Quando il server è attivo, visita:

\- \*\*Swagger UI\*\*: http://localhost:8001/docs

\- \*\*ReDoc\*\*: http://localhost:8001/redoc



\### Log Backend



```bash

\# Vedi log in real-time

tail -f /var/log/supervisor/backend.out.log



\# Vedi errori

tail -f /var/log/supervisor/backend.err.log

```



\## 🔐 TODO - Autenticazione Staff







\*\*Da implementare:\*\*

1\. JWT tokens per staff members

2\. Middleware di autenticazione

3\. Decoratore `@staff\_required` per routes protetti







1\. ✅ \*\*Setup Discord Bot\*\* (aggiungi token in .env)

2\. ✅ \*\*Restart backend\*\*

3\. ✅ \*\*Popola database\*\* con dati iniziali:

&nbsp;  ```bash

&nbsp;  # Esempio: aggiungi FAQ iniziali

&nbsp;  curl -X POST http://localhost:8001/api/faq \\

&nbsp;    -H "Content-Type: application/json" \\

&nbsp;    -d '{"question":"...", "answer":"...", "order":1}'

&nbsp;  ```

4\. ✅ \*\*Integra frontend\*\* con API (sostituisci mock.js)

5\. ✅ \*\*Test completo\*\* end-to-end







Per domande o problemi:

\- Controlla i log: `/var/log/supervisor/backend.\*.log`

\- Testa endpoints con `/docs`

\- Verifica che MongoDB sia in esecuzione







✅ Discord API integration (stats + staff status)

✅ Reviews management con approvazione

✅ Events CRUD completo

✅ FAQ CRUD con search e riordinamento

✅ Cache intelligente per Discord API

✅ Documentazione auto-generata

✅ Health check endpoints

✅ CORS configurato

✅ Logging strutturato



TODO



\- \[ ] Autenticazione JWT per staff

\- \[ ] Rate limiting

\- \[ ] Webhook Discord per notifiche

\- \[ ] Admin dashboard endpoints

\- \[ ] File upload per eventi (immagini)

\- \[ ] Export dati (CSV/JSON)



