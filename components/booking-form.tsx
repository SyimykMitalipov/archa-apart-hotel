"use client";

import { useState, type FormEvent } from "react";
import { bishkekToday, makeBookingMessage } from "../lib/booking";

export function BookingForm({ whatsapp, room }: { whatsapp: string; room?: string }) {
  const [arrival, setArrival] = useState("");
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      const message = makeBookingMessage({
        arrival: String(form.get("arrival")),
        departure: String(form.get("departure")),
        guests: Number(form.get("guests")),
        room,
      }, bishkekToday());
      const destination = new URL(whatsapp);
      destination.searchParams.set("text", message);
      window.location.assign(destination.href);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Проверьте поля или напишите нам напрямую.");
    }
  }

  return (
    <form onSubmit={submit} className="booking-form">
      <label>Заезд
        <input type="date" name="arrival" required
          onChange={(event) => setArrival(event.target.value)} />
      </label>
      <label>Выезд
        <input type="date" name="departure" required min={arrival || undefined} />
      </label>
      <label>Гостей
        <input type="number" name="guests" required min={1} step={1} defaultValue={2} />
      </label>
      <button type="submit" className="button">Отправить запрос</button>
      {error && <p className="form-error" role="alert">{error}</p>}
    </form>
  );
}
