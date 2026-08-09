export function generateBookingReference(): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(10000 + Math.random() * 89999);
  return `AUR-${year}-${rand}`;
}
