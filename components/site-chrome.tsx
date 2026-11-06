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
          <Link href="/#gallery">Фото</Link>
          <Link href="/#location">Как добраться</Link>
        </nav>
        <Link className="button header-cta" href="/#booking">Забронировать</Link>
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
        <a href={hotel.whatsapp}>WhatsApp {hotel.phone}</a>
      </div>
    </footer>
  );
}

export function FloatingWhatsApp() {
  return (
    <a className="floating-whatsapp" href={hotel.whatsapp} aria-label="Написать отелю в WhatsApp">
      <svg width="29" height="29" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.47 14.38c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.89-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.08 2.89 1.23 3.09.15.2 2.12 3.23 5.13 4.53.72.31 1.28.49 1.72.63.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35M12.03 21.8h-.01a9.83 9.83 0 0 1-5.01-1.37l-.36-.22-3.73.98 1-3.63-.24-.37a9.8 9.8 0 0 1-1.5-5.22c0-5.42 4.42-9.83 9.85-9.83 2.63 0 5.1 1.03 6.95 2.88a9.77 9.77 0 0 1 2.88 6.96c0 5.42-4.42 9.82-9.83 9.82M20.4 3.6A11.8 11.8 0 0 0 12.03.13C5.5.13.18 5.44.18 11.97c0 2.09.55 4.13 1.58 5.93L.08 24l6.25-1.64a11.85 11.85 0 0 0 5.68 1.45h.01c6.53 0 11.85-5.31 11.85-11.84 0-3.17-1.23-6.14-3.47-8.37Z" />
      </svg>
    </a>
  );
}
