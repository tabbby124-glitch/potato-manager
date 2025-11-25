# Potato Manager — Ready-to-run

This package contains a ready-to-run demo of the Potato Crop Management system.

## What's included
- `backend/` — Node.js + Express API (SQLite)
- `frontend/` — React (Vite) simple UI
- `docker-compose.yml` — run both services together
- Sample seed data (backend/seed.js)

## Quick start (Docker)
1. Ensure Docker and Docker Compose are installed.
2. From the project root run:
   ```bash
   docker compose up --build
   ```
3. Open the frontend at: `http://localhost:5173`
   API available at: `http://localhost:4000/api`

## Quick start (without Docker)
### Backend
```bash
cd backend
npm install
node seed.js
node server.js
```
Server will run on port 4000.

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173`.

## Notes
- The app is a demo scaffold. For production: add authentication, backups, and change SQLite to a managed DB if needed.
- If you want, I can deploy this for you to a cloud provider (Railway / Render / Fly) and configure a real domain.
