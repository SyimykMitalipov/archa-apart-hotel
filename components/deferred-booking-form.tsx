"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const BookingForm = dynamic(
  () => import("./booking-form").then((module) => module.BookingForm),
  { loading: () => <p role="status">Загружаем форму…</p> },
);

export function DeferredBookingForm({ whatsapp, room }: { whatsapp: string; room?: string }) {
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!container.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: "200px" });
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={container} className="deferred-booking">
      {visible ? <BookingForm whatsapp={whatsapp} room={room} /> : (
        <button className="button" type="button" onClick={() => setVisible(true)}>
          Выбрать даты
        </button>
      )}
    </div>
  );
}
