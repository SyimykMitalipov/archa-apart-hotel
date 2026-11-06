import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="wrap room-detail">
      <h1>Страница не найдена</h1>
      <Link href="/" className="text-link">На главную</Link>
    </main>
  );
}
