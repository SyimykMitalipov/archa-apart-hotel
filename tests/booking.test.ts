import assert from "node:assert/strict";
import { test } from "node:test";
import { bishkekToday, makeBookingMessage } from "../lib/booking.ts";

const today = "2026-11-06";
const request = { arrival: today, departure: "2026-11-08", guests: 3 };

test("formats dates and room category for WhatsApp", () => {
  const message = makeBookingMessage({ ...request, room: "Семейный номер" }, today);
  assert.match(message, /Категория: Семейный номер\nЗаезд: 06\.11\.2026\nВыезд: 08\.11\.2026\nГостей: 3/);
});

test("rejects past, equal and nonexistent dates", () => {
  assert.throws(() => makeBookingMessage({ ...request, arrival: "2026-11-05" }, today));
  assert.throws(() => makeBookingMessage({ ...request, departure: today }, today));
  assert.throws(() => makeBookingMessage({ ...request, departure: "2026-11-31" }, today));
});

test("rejects invalid guest counts", () => {
  for (const guests of [0, -1, 2.5, Infinity]) {
    assert.throws(() => makeBookingMessage({ ...request, guests }, today));
  }
});

test("uses the Bishkek date at the UTC day boundary", () => {
  assert.equal(bishkekToday(new Date("2026-11-05T18:00:00Z")), today);
});
