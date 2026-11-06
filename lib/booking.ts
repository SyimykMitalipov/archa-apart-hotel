const datePattern = /^\d{4}-\d{2}-\d{2}$/;

function validDate(value: string) {
  if (!datePattern.test(value)) return false;
  const date = new Date(value + "T00:00:00Z");
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function bishkekToday(now = new Date()) {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Bishkek" }).format(now);
}

export function makeBookingMessage(
  { arrival, departure, guests, room }: { arrival: string; departure: string; guests: number; room?: string },
  today: string,
) {
  if (!validDate(arrival) || !validDate(departure) || arrival < today || departure <= arrival) {
    throw new Error("Укажите заезд не раньше сегодняшнего дня и выезд после даты заезда.");
  }
  if (!Number.isSafeInteger(guests) || guests < 1) {
    throw new Error("Укажите количество гостей.");
  }

  const formatDate = (date: string) => date.split("-").reverse().join(".");
  return [
    "Здравствуйте! Подскажите, пожалуйста, есть ли свободный номер в Archa Apart Hotel?",
    room ? `Категория: ${room}` : "",
    `Заезд: ${formatDate(arrival)}`,
    `Выезд: ${formatDate(departure)}`,
    `Гостей: ${guests}`,
  ].filter(Boolean).join("\n");
}
