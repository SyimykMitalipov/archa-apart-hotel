import { hotel } from "../lib/hotel";
import { BookingForm } from "./booking-form";

export function BookingSection({ room }: { room?: string }) {
  return (
    <section className="booking-section" id="booking" aria-labelledby="booking-title">
      <div className="wrap booking-inner">
        <div>
          <h2 id="booking-title">Бронирование</h2>
          <p>Укажите даты и число гостей. В WhatsApp откроется готовое сообщение для администратора.</p>
          <a href={hotel.whatsapp} className="text-link">Написать без указания дат ↗</a>
        </div>
        <BookingForm whatsapp={hotel.whatsapp} room={room} />
      </div>
    </section>
  );
}
