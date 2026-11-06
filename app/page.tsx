import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, CarFront, MapPin, Trees, Wifi } from "lucide-react";
import { HeroCarousel } from "../components/hero-carousel";
import { PhotoGallery } from "../components/photo-gallery";
import { BookingSection } from "../components/booking-section";
import { hotel, hotelMaps, rooms } from "../lib/hotel";
import { hotelSchema, pageMetadata } from "../lib/seo";

export const metadata = pageMetadata(
  "Archa Apart Hotel — апарт-отель в Бишкеке",
  hotel.description,
  "/",
);

export default function Home() {
  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(hotelSchema).replace(/</g, "\\u003c"),
      }} />
      <section className="hero" aria-labelledby="hotel-title">
        <HeroCarousel />
        <div className="wrap hero-content">
          <h1 id="hotel-title">{hotel.name}</h1>
          <p>Апарт-отель в Бишкеке</p>
          <div className="hero-actions">
            <a className="button button-light" href="#booking">Забронировать</a>
            <a className="hero-gallery-link" href="#gallery">Смотреть фото</a>
            <span><ArrowDown aria-hidden="true" size={16} /> Запрос в WhatsApp</span>
          </div>
        </div>
      </section>

      <div className="wrap info-strip">
        <div className="address">
          <span><MapPin size={20} aria-hidden="true" /> {hotel.street}</span>
          <a className="text-link" href="#location">На карте <ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
        <ul aria-label="Удобства">
          <li><Wifi size={22} aria-hidden="true" /> Wi-Fi</li>
          <li><CarFront size={22} aria-hidden="true" /> Парковка</li>
          <li><Trees size={22} aria-hidden="true" /> Детская площадка</li>
        </ul>
      </div>

      <section className="wrap rooms-section" id="rooms" aria-labelledby="rooms-title">
        <div className="section-heading">
          <h2 id="rooms-title">Номера и апартаменты</h2>
          <p>Выберите подходящий вариант для вашей поездки</p>
        </div>
        <div className="rooms-grid">
          {rooms.map((room) => (
            <article className="room-card" key={room.slug}>
              <Link href={`/rooms/${room.slug}`} className="room-card-link">
                <div className="room-image">
                  <Image src={room.image} alt={room.imageAlt} fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1240px) 33vw, 390px" />
                </div>
                <h3>{room.name}</h3>
                <p>{room.summary}</p>
                <span className="text-link">Подробнее <ArrowRight size={17} aria-hidden="true" /></span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="courtyard" id="courtyard" aria-labelledby="courtyard-title">
        <div className="wrap courtyard-inner">
          <div className="courtyard-photo">
            <Image src="/images/courtyard.webp" fill
              sizes="(max-width: 720px) 100vw, 55vw"
              alt="Вечерний двор Archa с очагом и детской площадкой" />
          </div>
          <div className="section-heading">
            <h2 id="courtyard-title">Вечер во дворе</h2>
            <p>Терраса и детская площадка</p>
          </div>
        </div>
      </section>

      <PhotoGallery />

      <section className="wrap location" id="location" aria-labelledby="location-title">
        <h2 id="location-title">Как добраться</h2>
        <address><MapPin size={20} aria-hidden="true" /> {hotel.city}, {hotel.street}</address>
        <nav className="map-links" aria-label="Открыть отель на карте">
          {hotelMaps.map(({ name, href }) => (
            <a key={name} className="button map-link" href={href}>
              <MapPin size={16} aria-hidden="true" /> {name} <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          ))}
        </nav>
      </section>

      <BookingSection />
    </main>
  );
}
