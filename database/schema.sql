-- ============================================================================
-- AUREA Luxury Hotels — Database Schema (PostgreSQL 14+)
-- ============================================================================
-- Run with:  psql -U postgres -d aurea -f schema.sql
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ---------------------------------------------------------------------------
-- USERS
-- ---------------------------------------------------------------------------
CREATE TABLE users (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name      VARCHAR(100) NOT NULL,
  last_name       VARCHAR(100) NOT NULL,
  email           VARCHAR(255) NOT NULL UNIQUE,
  phone           VARCHAR(30),
  password_hash   VARCHAR(255) NOT NULL,
  role            VARCHAR(20)  NOT NULL DEFAULT 'guest' CHECK (role IN ('guest', 'admin')),
  loyalty_points  INTEGER NOT NULL DEFAULT 0,
  avatar_url      TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- HOTELS
-- ---------------------------------------------------------------------------
CREATE TABLE hotels (
  id              SERIAL PRIMARY KEY,
  name            VARCHAR(150) NOT NULL,
  location        VARCHAR(150) NOT NULL,
  city            VARCHAR(100),
  state           VARCHAR(100),
  country         VARCHAR(100) NOT NULL,
  category        VARCHAR(60)  NOT NULL,          -- Cliffside, Overwater, Ryokan, ...
  description     TEXT,
  base_price      NUMERIC(10,2) NOT NULL,
  rating          NUMERIC(3,2) NOT NULL DEFAULT 0,
  review_count    INTEGER NOT NULL DEFAULT 0,
  image_url       TEXT,
  badge           VARCHAR(40),                    -- Editor's Pick, Rare Find, Trending, New
  tags            TEXT[] NOT NULL DEFAULT '{}',    -- Infinity Pool, Sea View, ...
  amenities       TEXT[] NOT NULL DEFAULT '{}',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_hotels_country  ON hotels(country);
CREATE INDEX idx_hotels_city     ON hotels(city);
CREATE INDEX idx_hotels_category ON hotels(category);

-- ---------------------------------------------------------------------------
-- HOTEL IMAGES (gallery, one row per extra image)
-- ---------------------------------------------------------------------------
CREATE TABLE hotel_images (
  id          SERIAL PRIMARY KEY,
  hotel_id    INTEGER NOT NULL REFERENCES hotels(id) ON DELETE CASCADE,
  image_url   TEXT NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0
);

-- ---------------------------------------------------------------------------
-- ROOMS
-- ---------------------------------------------------------------------------
CREATE TABLE rooms (
  id            SERIAL PRIMARY KEY,
  hotel_id      INTEGER NOT NULL REFERENCES hotels(id) ON DELETE CASCADE,
  name          VARCHAR(120) NOT NULL,             -- Deluxe Suite, Executive Suite, ...
  size_sqm      NUMERIC(6,2) NOT NULL,
  capacity      INTEGER NOT NULL,
  price         NUMERIC(10,2) NOT NULL,
  image_url     TEXT,
  amenities     TEXT[] NOT NULL DEFAULT '{}',
  is_available  BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_rooms_hotel ON rooms(hotel_id);

-- ---------------------------------------------------------------------------
-- PROMO CODES
-- ---------------------------------------------------------------------------
CREATE TABLE promo_codes (
  id                SERIAL PRIMARY KEY,
  code              VARCHAR(40) NOT NULL UNIQUE,
  discount_percent  NUMERIC(5,2) NOT NULL CHECK (discount_percent > 0 AND discount_percent <= 100),
  active            BOOLEAN NOT NULL DEFAULT true,
  expires_at        TIMESTAMPTZ
);

-- ---------------------------------------------------------------------------
-- BOOKINGS
-- ---------------------------------------------------------------------------
CREATE TABLE bookings (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference           VARCHAR(20) NOT NULL UNIQUE,     -- e.g. AUR-2026-08142
  user_id             UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  hotel_id            INTEGER NOT NULL REFERENCES hotels(id),
  room_id             INTEGER NOT NULL REFERENCES rooms(id),
  check_in            DATE NOT NULL,
  check_out           DATE NOT NULL,
  guests              INTEGER NOT NULL DEFAULT 1,
  nights              INTEGER NOT NULL,
  special_requests    TEXT,
  promo_code          VARCHAR(40) REFERENCES promo_codes(code),
  subtotal            NUMERIC(10,2) NOT NULL,
  discount            NUMERIC(10,2) NOT NULL DEFAULT 0,
  taxes               NUMERIC(10,2) NOT NULL DEFAULT 0,
  service_fee         NUMERIC(10,2) NOT NULL DEFAULT 0,
  total               NUMERIC(10,2) NOT NULL,
  status              VARCHAR(20) NOT NULL DEFAULT 'pending'
                        CHECK (status IN ('pending','confirmed','completed','cancelled')),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (check_out > check_in)
);

CREATE INDEX idx_bookings_user  ON bookings(user_id);
CREATE INDEX idx_bookings_hotel ON bookings(hotel_id);
CREATE INDEX idx_bookings_status ON bookings(status);

-- ---------------------------------------------------------------------------
-- PAYMENTS
-- ---------------------------------------------------------------------------
CREATE TABLE payments (
  id                SERIAL PRIMARY KEY,
  booking_id        UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  method            VARCHAR(30) NOT NULL,            -- card, paypal, bank_transfer
  amount            NUMERIC(10,2) NOT NULL,
  status            VARCHAR(20) NOT NULL DEFAULT 'pending'
                        CHECK (status IN ('pending','succeeded','failed','refunded')),
  transaction_ref   VARCHAR(60),
  card_last4        VARCHAR(4),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_payments_booking ON payments(booking_id);

-- ---------------------------------------------------------------------------
-- REVIEWS
-- ---------------------------------------------------------------------------
CREATE TABLE reviews (
  id            SERIAL PRIMARY KEY,
  hotel_id      INTEGER NOT NULL REFERENCES hotels(id) ON DELETE CASCADE,
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  booking_id    UUID REFERENCES bookings(id) ON DELETE SET NULL,
  rating        SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment       TEXT,
  admin_reply   TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_reviews_hotel ON reviews(hotel_id);

-- ---------------------------------------------------------------------------
-- WISHLIST
-- ---------------------------------------------------------------------------
CREATE TABLE wishlists (
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  hotel_id    INTEGER NOT NULL REFERENCES hotels(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, hotel_id)
);

-- ---------------------------------------------------------------------------
-- NOTIFICATIONS
-- ---------------------------------------------------------------------------
CREATE TABLE notifications (
  id          SERIAL PRIMARY KEY,
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title       VARCHAR(150) NOT NULL,
  body        TEXT NOT NULL,
  type        VARCHAR(20) NOT NULL CHECK (type IN ('booking','offer','review','system')),
  read        BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_notifications_user ON notifications(user_id, read);

-- ---------------------------------------------------------------------------
-- Trigger: keep hotels.rating / review_count in sync with reviews
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION refresh_hotel_rating() RETURNS TRIGGER AS $$
BEGIN
  UPDATE hotels SET
    rating = COALESCE((SELECT ROUND(AVG(rating)::numeric, 2) FROM reviews WHERE hotel_id = COALESCE(NEW.hotel_id, OLD.hotel_id)), 0),
    review_count = (SELECT COUNT(*) FROM reviews WHERE hotel_id = COALESCE(NEW.hotel_id, OLD.hotel_id))
  WHERE id = COALESCE(NEW.hotel_id, OLD.hotel_id);
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_reviews_after_change
AFTER INSERT OR UPDATE OR DELETE ON reviews
FOR EACH ROW EXECUTE FUNCTION refresh_hotel_rating();

-- ---------------------------------------------------------------------------
-- Trigger: auto-update updated_at columns
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION set_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated_at    BEFORE UPDATE ON users    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_hotels_updated_at   BEFORE UPDATE ON hotels   FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION set_updated_at();
