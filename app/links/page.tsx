import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BedDouble, Images, MapPin, MessageCircle } from "lucide-react";
import { hotel, hotelMaps } from "../../lib/hotel";
import { indexable, pageMetadata } from "../../lib/seo";
import styles from "./links.module.css";

export const metadata = {
  ...pageMetadata(
    "Archa Apart Hotel — бронирование и ссылки",
    "Бронирование в WhatsApp, фотографии номеров и маршрут до Archa Apart Hotel в Бишкеке.",
    "/links",
  ),
  robots: { index: false, follow: indexable },
};

export default function HotelLinksPage() {
  return (
    <main id="main" className={styles.page} data-hotel-links>
      <div className={styles.card}>
        <div className={styles.cover}>
          <Image src="/images/covered-terrace.webp" alt="Терраса Archa Apart Hotel"
            fill sizes="(max-width: 560px) 100vw, 480px" preload />
        </div>
        <div className={styles.content}>
          <Image src="/images/brand.webp" alt="" width={168} height={49} />
          <h1>{hotel.name}</h1>
          <p>Апарт-отель в Бишкеке</p>
          <nav className={styles.actions} aria-label="Ссылки отеля">
            <a className="button" href={hotel.whatsapp}>
              <MessageCircle size={20} aria-hidden="true" />
              Забронировать в WhatsApp
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <Link className={styles.link} href="/#rooms">
              <BedDouble size={20} aria-hidden="true" /> Номера и апартаменты
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link className={styles.link} href="/#gallery">
              <Images size={20} aria-hidden="true" /> Фотографии отеля
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </nav>
          <section className={styles.location} aria-labelledby="links-location">
            <h2 id="links-location">Как добраться</h2>
            <p><MapPin size={17} aria-hidden="true" /> {hotel.city}, {hotel.street}</p>
            <div className={styles.maps}>
              {hotelMaps.map(({ name, href }) => (
                <a key={name} href={href}>{name} <ArrowUpRight size={14} aria-hidden="true" /></a>
              ))}
            </div>
          </section>
          <Link className="text-link" href="/">На сайт отеля <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>
    </main>
  );
}
