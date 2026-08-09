# Backend — AUREA Luxury Hotels API

Node.js + Express + TypeScript REST API backed by PostgreSQL. Mirrors every
screen in the `frontend` prototype (hotels, rooms, booking flow, payments,
wishlist, reviews, notifications, profile, admin dashboard).

## Setup

```bash
cd backend
npm install
cp .env.example .env      # then edit DATABASE_URL / JWT_SECRET
npm run dev                # http://localhost:4000
```

Make sure the `../database/schema.sql` and `seed.sql` have been applied to
the Postgres instance pointed to by `DATABASE_URL` first.

### Using Supabase instead of local Postgres

Supabase is just hosted PostgreSQL, so nothing in `schema.sql`/`seed.sql`
needs to change. Steps:

1. Create a project at supabase.com.
2. Go to **Project Settings → Database → Connection string → URI** and copy it.
3. Paste it into `backend/.env` as `DATABASE_URL` (fill in your password).
4. Run the schema and seed against Supabase instead of local Postgres, e.g.:
   ```bash
   psql "your-supabase-connection-string" -f ../database/schema.sql
   psql "your-supabase-connection-string" -f ../database/seed.sql
   ```
   (You can also paste the file contents into Supabase's SQL Editor and run
   them there — no `psql` needed.)
5. `npm run dev` as usual. The backend automatically enables SSL for any
   non-localhost `DATABASE_URL`, which Supabase requires.

## Scripts

| Command         | Purpose                          |
|-----------------|-----------------------------------|
| `npm run dev`   | Start with hot-reload (tsx watch) |
| `npm run build` | Compile TypeScript to `dist/`     |
| `npm start`     | Run the compiled build            |

## API Reference

### Auth
| Method | Path              | Auth | Description        |
|--------|-------------------|------|---------------------|
| POST   | /api/auth/signup  | –    | Create account       |
| POST   | /api/auth/signin  | –    | Log in, get JWT      |
| GET    | /api/auth/me      | ✅   | Current user profile |

### Hotels
| Method | Path                        | Auth  | Description                  |
|--------|-----------------------------|-------|-------------------------------|
| GET    | /api/hotels                 | –     | List (filters: country, city, category, minPrice, maxPrice, search) |
| GET    | /api/hotels/:id             | –     | Detail + rooms + reviews + images |
| GET    | /api/hotels/:hotelId/rooms  | –     | Rooms for a hotel             |
| GET    | /api/hotels/:hotelId/reviews| –     | Reviews for a hotel           |
| POST   | /api/hotels                 | admin | Create hotel                  |
| PATCH  | /api/hotels/:id             | admin | Update hotel                  |
| DELETE | /api/hotels/:id             | admin | Delete hotel                  |

### Rooms
| Method | Path                          | Auth | Description                          |
|--------|-------------------------------|------|----------------------------------------|
| GET    | /api/rooms/:id/availability   | –    | `?checkIn=&checkOut=` → `{ available }` |

### Bookings
| Method | Path                        | Auth | Description                         |
|--------|-----------------------------|------|---------------------------------------|
| POST   | /api/bookings               | ✅   | Create booking (validates overlap, applies promo) |
| GET    | /api/bookings/mine          | ✅   | "My Trips" list                       |
| GET    | /api/bookings/:id           | ✅   | Booking detail                        |
| POST   | /api/bookings/:id/cancel    | ✅   | Cancel a pending/confirmed booking    |
| POST   | /api/bookings/promo/validate| ✅   | Check a promo code against a subtotal |

### Payments
| Method | Path            | Auth | Description                                          |
|--------|-----------------|------|--------------------------------------------------------|
| POST   | /api/payments   | ✅   | Pay for a pending booking → confirms it, fires a notification |

### Wishlist
| Method | Path                     | Auth | Description       |
|--------|--------------------------|------|--------------------|
| GET    | /api/wishlist            | ✅   | List liked hotels  |
| POST   | /api/wishlist            | ✅   | `{ hotelId }`      |
| DELETE | /api/wishlist/:hotelId   | ✅   | Remove             |

### Reviews
| Method | Path           | Auth | Description                          |
|--------|----------------|------|----------------------------------------|
| POST   | /api/reviews   | ✅   | `{ hotelId, bookingId?, rating, comment }` |

### Notifications
| Method | Path                          | Auth | Description        |
|--------|-------------------------------|------|----------------------|
| GET    | /api/notifications            | ✅   | List                |
| PATCH  | /api/notifications/:id/read   | ✅   | Mark one read       |
| PATCH  | /api/notifications/read-all   | ✅   | Mark all read       |
| DELETE | /api/notifications/:id        | ✅   | Delete              |

### Users
| Method | Path                | Auth | Description       |
|--------|---------------------|------|--------------------|
| GET    | /api/users/profile  | ✅   | Get own profile   |
| PATCH  | /api/users/profile  | ✅   | Update own profile|

### Admin
| Method | Path                          | Auth  | Description                          |
|--------|-------------------------------|-------|----------------------------------------|
| GET    | /api/admin/stats?period=30d   | admin | Revenue, bookings, guests, avg rating |
| GET    | /api/admin/bookings           | admin | All bookings                          |
| GET    | /api/admin/revenue-by-hotel   | admin | Revenue breakdown per hotel           |

## Auth model

JWT bearer tokens (`Authorization: Bearer <token>`), issued on signup/signin,
containing `{ userId, role }`. `role` is `guest` or `admin`.

## Notes

- Pricing logic (12% tax, $180 service fee, promo codes) matches the numbers
  hardcoded in the frontend `BookingPage` component, so totals line up when
  wired together.
- `processPayment` simulates a gateway; swap it for Stripe/Adyen/etc. in
  production — the booking/notification side effects stay the same.
