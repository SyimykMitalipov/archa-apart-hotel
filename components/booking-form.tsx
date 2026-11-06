"use client";

import { parseDate, type CalendarDate } from "@internationalized/date";
import { ChevronDown } from "lucide-react";
import {
  Button, Input, I18nProvider, Label, ListBox, ListBoxItem, Popover, Select, SelectValue, TextField,
} from "react-aria-components";
import { rooms } from "../lib/hotel";
import { BookingDatePicker } from "./booking-date-picker";
import { useState, type FormEvent } from "react";
import { bishkekToday, makeBookingMessage } from "../lib/booking";

export function BookingForm({ whatsapp, room }: { whatsapp: string; room?: string }) {
  const [arrival, setArrival] = useState<CalendarDate | null>(null);
  const [departure, setDeparture] = useState<CalendarDate | null>(null);
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      const message = makeBookingMessage({
        arrival: arrival?.toString() ?? "",
        departure: departure?.toString() ?? "",
        guests: Number(form.get("guests")),
        room: room ?? rooms.find(({ slug }) => slug === form.get("room"))?.name,
      }, bishkekToday());
      const destination = new URL(whatsapp);
      destination.searchParams.set("text", message);
      window.location.assign(destination.href);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Проверьте поля или напишите нам напрямую.");
    }
  }

  const today = parseDate(bishkekToday());

  return (
    <I18nProvider locale="ru-RU">
      <form onSubmit={submit} className="booking-form">
        <BookingDatePicker label="Заезд" minValue={today} onChange={setArrival} />
        <BookingDatePicker label="Выезд" onChange={setDeparture}
          minValue={(arrival ?? today).add({ days: 1 })} />
        <TextField className="booking-field" name="guests" type="number" defaultValue="2" isRequired>
          <Label>Гостей</Label>
          <Input className="booking-control" min={1} step={1} />
        </TextField>
        {!room && (
          <Select className="booking-field booking-category" name="room" defaultValue="any">
            <Label>Категория номера</Label>
            <Button className="booking-control booking-select">
              <SelectValue />
              <ChevronDown size={18} aria-hidden="true" />
            </Button>
            <Popover className="booking-popover">
              <ListBox className="booking-options">
                <ListBoxItem id="any">Любая категория</ListBoxItem>
                {rooms.map(({ slug, name }) => <ListBoxItem key={slug} id={slug}>{name}</ListBoxItem>)}
              </ListBox>
            </Popover>
          </Select>
        )}
        <Button type="submit" className="button booking-submit">Отправить запрос</Button>
        {error && <p className="form-error" role="alert">{error}</p>}
      </form>
    </I18nProvider>
  );
}
