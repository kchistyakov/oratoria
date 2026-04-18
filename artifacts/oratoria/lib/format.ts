export function formatEventDate(date: Date): string {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    timeZone: "Europe/Moscow",
  }).format(date);
}

export function formatEventTime(date: Date): string {
  return new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Moscow",
  }).format(date);
}

export function formatPrice(price: number): string {
  if (price === 0) return "Бесплатно";
  return new Intl.NumberFormat("ru-RU").format(price) + "\u00a0₽";
}
