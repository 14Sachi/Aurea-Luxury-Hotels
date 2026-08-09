// Minimal API client for the AUREA backend.
// The prototype's screens currently use local mock data (HOTELS/ROOMS in
// App.tsx). Swap those for calls through this client to go live.

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

function getToken() {
  return localStorage.getItem("aurea_token");
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

// ─── Auth ───────────────────────────────────────────────────────────────────
export const signup = (data: { firstName: string; lastName: string; email: string; phone?: string; password: string }) =>
  request<{ token: string; user: any }>("/auth/signup", { method: "POST", body: JSON.stringify(data) });

export const signin = (data: { email: string; password: string }) =>
  request<{ token: string; user: any }>("/auth/signin", { method: "POST", body: JSON.stringify(data) });

export const getMe = () => request<any>("/auth/me");

// ─── Hotels ─────────────────────────────────────────────────────────────────
export const getHotels = (params: Record<string, string> = {}) =>
  request<any[]>(`/hotels?${new URLSearchParams(params)}`);

export const getHotel = (id: number | string) => request<any>(`/hotels/${id}`);

// ─── Bookings ───────────────────────────────────────────────────────────────
export const createBooking = (data: {
  hotelId: number; roomId: number; checkIn: string; checkOut: string;
  guests: number; specialRequests?: string; promoCode?: string;
}) => request<any>("/bookings", { method: "POST", body: JSON.stringify(data) });

export const getMyBookings = () => request<any[]>("/bookings/mine");

export const validatePromo = (code: string, subtotal: number) =>
  request<{ valid: boolean; discount: number }>("/bookings/promo/validate", {
    method: "POST",
    body: JSON.stringify({ code, subtotal }),
  });

// ─── Payments ───────────────────────────────────────────────────────────────
export const payForBooking = (data: { bookingId: string; method: string; cardLast4?: string }) =>
  request<any>("/payments", { method: "POST", body: JSON.stringify(data) });

// ─── Wishlist ───────────────────────────────────────────────────────────────
export const getWishlist = () => request<any[]>("/wishlist");
export const addToWishlist = (hotelId: number) =>
  request<any>("/wishlist", { method: "POST", body: JSON.stringify({ hotelId }) });
export const removeFromWishlist = (hotelId: number) =>
  request<any>(`/wishlist/${hotelId}`, { method: "DELETE" });

// ─── Notifications ──────────────────────────────────────────────────────────
export const getNotifications = () => request<any[]>("/notifications");
export const markNotificationRead = (id: number) => request<any>(`/notifications/${id}/read`, { method: "PATCH" });
export const markAllNotificationsRead = () => request<any>("/notifications/read-all", { method: "PATCH" });
