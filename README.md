# AUREA — Luxury Hotel Booking Platform

Full-stack rebuild of the Figma Make prototype, split into three parts:

```
AureaLuxuryHotels/
├── frontend/   React 19 + Vite + TypeScript + Tailwind (the original UI prototype)
├── backend/    Node.js + Express + TypeScript REST API
└── database/   PostgreSQL schema + seed data
```

## Quick start (run in this order)

### 1. Database
```bash
cd database
createdb aurea
psql -U postgres -d aurea -f schema.sql
psql -U postgres -d aurea -f seed.sql
```

### 2. Backend
```bash
cd backend
npm install
cp .env.example .env      # set DATABASE_URL, JWT_SECRET
npm run dev                # http://localhost:4000
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev                 # http://localhost:5173 (or whatever Vite picks)
```

Set `VITE_API_URL=http://localhost:4000/api` in a `frontend/.env` file if you
want to point the new `src/lib/api.ts` client at the backend.

## What's in each folder

- **`database/`** — `schema.sql` defines users, hotels, rooms, bookings,
  payments, reviews, wishlists, notifications, and promo codes, with
  triggers that keep hotel ratings and `updated_at` timestamps in sync.
  `seed.sql` loads the same 8 hotels and 4 room tiers the frontend already
  shows, so the two line up.

- **`backend/`** — A REST API (see `backend/README.md` for the full route
  table) covering auth, hotel/room browsing, the booking flow (with
  date-overlap checks and promo codes), simulated payments, wishlist,
  reviews, notifications, profile, and an admin dashboard. Pricing math
  (12% tax, $180 service fee) matches what's hardcoded in the frontend's
  booking screen.

- **`frontend/`** — The original prototype, unmodified and still runnable
  on its own with its built-in mock data. A new `src/lib/api.ts` client has
  been added with one function per backend endpoint, ready to swap in for
  the local `HOTELS`/`ROOMS` arrays and `useState` mocks in `App.tsx` when
  you're ready to connect it to the real API.

## Current state / what's left to wire up

The frontend prototype is currently self-contained — sign-in, booking,
payment, wishlist, etc. all operate on in-memory mock state inside
`App.tsx`. The backend and database are fully independent and functional
(you can test them directly, e.g. with curl/Postman/Insomnia) but nothing
in the frontend calls them yet. Wiring it up means replacing the relevant
`useState`/mock-array logic in `App.tsx` with calls to the functions in
`src/lib/api.ts` — happy to do that next if you'd like.
