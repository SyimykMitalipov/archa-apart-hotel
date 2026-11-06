import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BookingSection } from "../../../components/booking-section";
import { hotel, rooms } from "../../../lib/hotel";
import { pageMetadata, roomBreadcrumbSchema } from "../../../lib/seo";

type RoomPageProps = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return rooms.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: RoomPageProps) {
  const { slug } = await params;
  const room = rooms.find((entry) => entry.slug === slug);
  if (!room) notFound();

  return pageMetadata(`${room.name} в Бишкеке — ${hotel.name}`, room.description, `/rooms/${room.slug}`);
}

export default async function RoomPage({ params }: RoomPageProps) {
  const { slug } = await params;
  const room = rooms.find((entry) => entry.slug === slug);
  if (!room) notFound();

  const breadcrumb = roomBreadcrumbSchema(room.name, room.slug);

  return (
    <main id="main">
      {breadcrumb && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c"),
        }} />
      )}
      <article className="wrap room-detail">
        <nav className="breadcrumb" aria-label="Хлебные крошки">
          <Link href="/" className="text-link">{hotel.name}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{room.name}</span>
        </nav>
        <Link href="/#rooms" className="text-link"><ArrowLeft size={17} aria-hidden="true" /> Все номера</Link>
        <div className="room-detail-grid">
          <div>
            <p className="eyebrow">{hotel.name} · {hotel.city}</p>
            <h1>{room.name}</h1>
            <p>{room.description}</p>
            <a href="#booking" className="button">Узнать свободные даты</a>
          </div>
          <div className="room-image">
            <Image src={room.image} alt={room.imageAlt} fill preload sizes="(max-width: 720px) 100vw, 55vw" />
          </div>
        </div>
      </article>
      <BookingSection room={room.name} />
    </main>
  );
}
