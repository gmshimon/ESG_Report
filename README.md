# ESG Reporting App — Local Start Guide

This repo has two apps:
- `Backend/` — NestJS API with Prisma + PostgreSQL.
- `frontend/` — Next.js UI that calls the API.

Follow the steps below to get everything running locally.

## Prerequisites
- Node.js 20.x (or newer) with npm 10.x.
- PostgreSQL 14+ reachable on your machine.
- Two terminals/panes to run backend and frontend side by side.

## 1) Backend (NestJS + Prisma)
```bash
cd Backend
```
1. Create `.env` with your Postgres connection (adjust credentials/DB name as needed):
   ```
   PORT=3001
   ```
2. Install dependencies (runs `prisma generate` via postinstall):
   ```bash
   npm install
   ```
3. Start the API (http://localhost:3001 by default):
   ```bash
   npm run start:dev   # watch mode
   # or
   npm run start:prod  # after `npm run build`
   ```

## 2) Frontend (Next.js)
```bash
cd frontend
```
1. Install dependencies:
   ```bash
   npm install
   ```
2. If your API runs on a different URL/port, update the `baseURL` in `frontend/lib/axios.ts` (defaults to `http://localhost:3001/`).
3. Start the web app (http://localhost:3000):
   ```bash
   npm run dev
   # production: npm run build && npm start
   ```

## 3) Running both together
- Start the backend first so the frontend can reach the API.
- Keep both processes running in separate terminals. Default ports: API `3001`, frontend `3000`.

## 4) Handy commands
- Backend tests: `cd Backend && npm test` (e2e: `npm run test:e2e`)
- Lint: `cd Backend && npm run lint` | `cd frontend && npm run lint`
- Regenerate Prisma client manually (if schema changes): `cd Backend && npx prisma generate`

You should now be able to enter records via the UI and see them persisted in PostgreSQL.
