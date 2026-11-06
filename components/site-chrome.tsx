import Image from "next/image";
import Link from "next/link";
import { hotel } from "../lib/hotel";

export function Header() {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link href="/" className="brand">
          <Image src="/images/brand.webp" alt={hotel.name} width={168} height={49} />
        </Link>
        <nav aria-label="Главная навигация">
          <Link href="/#rooms">Номера</Link>
          <Link href="/#courtyard">Двор</Link>
          <Link href="/#location">Как добраться</Link>
        </nav>
        <Link className="button header-cta" href="/#booking">Узнать свободные даты</Link>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <span>{hotel.name}</span>
        <a href={hotel.instagram}>Instagram</a>
        <a href={hotel.booking}>Booking.com</a>
        <a href={hotel.whatsapp}>WhatsApp</a>
      </div>
    </footer>
  );
}
