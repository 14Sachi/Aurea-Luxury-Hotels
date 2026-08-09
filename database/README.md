# Database — AUREA Luxury Hotels

PostgreSQL 14+ schema for the booking platform.

## Setup

```bash
createdb aurea
psql -U postgres -d aurea -f schema.sql
psql -U postgres -d aurea -f seed.sql
```

## Entities

| Table          | Purpose                                                        |
|----------------|-----------------------------------------------------------------|
| `users`        | Guests and admins (role column), auth + loyalty points          |
| `hotels`       | Property catalogue (name, location, city, state, country, price, rating, tags) |
| `hotel_images` | Extra gallery images per hotel                                  |
| `rooms`        | Room types per hotel (Deluxe Suite, Villa, Presidential Suite…) |
| `promo_codes`  | Discount codes (e.g. `AUREA30`)                                 |
| `bookings`     | Reservations, pricing breakdown, status                         |
| `payments`     | Payment attempts linked to a booking                             |
| `reviews`      | Guest reviews, auto-syncs `hotels.rating` / `review_count`      |
| `wishlists`    | User ↔ hotel saved/liked pairs                                  |
| `notifications`| Per-user notification feed (booking, offer, review, system)     |

`seed.sql` inserts 106 hotels spanning 60+ cities and 40+ countries (each
with 4 room tiers — Deluxe Suite, Executive Suite, Luxury Villa, Presidential
Suite), 6 promo codes (`AUREA30`, `WELCOME15`, `LUXURY20`, `SUMMER25`,
`VIP40`, `AUREA10`), and 7 demo users (1 admin + 6 guests).

> Demo user passwords are placeholder bcrypt hashes — they won't pass login.
> Create real accounts through `POST /api/auth/signup`, or regenerate the
> hashes with `bcrypt.hash(password, 10)` before loading this file.

Two triggers keep derived data consistent automatically:
- `trg_reviews_after_change` recomputes a hotel's `rating`/`review_count` whenever reviews change.
- `trg_*_updated_at` stamps `updated_at` on update for `users`, `hotels`, `bookings`.
