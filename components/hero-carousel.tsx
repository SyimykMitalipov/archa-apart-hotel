"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const slides = [
  { src: "/images/hero.webp", alt: "Гостиная апартаментов Archa с жёлтым диваном" },
  { src: "/images/apartment.webp", alt: "Гостиная с обеденным столом и жёлтым диваном" },
  { src: "/images/covered-terrace.webp", alt: "Крытая терраса с большим столом и настольным теннисом" },
  { src: "/images/kitchen.webp", alt: "Кухня апартаментов с плитой и холодильником" },
  {
    src: "/images/facade-day.webp",
    alt: "Фасад Archa Apart Hotel и детская площадка днём",
    fit: "contain",
  },
];

export function HeroCarousel() {
  const photos = useRef<HTMLDivElement>(null);
  const ready = useRef(new Set<number>());
  const [active, setActive] = useState(0);
  const [pending, setPending] = useState<number | null>(null);
  const [loaded, setLoaded] = useState<number[]>([0]);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || !photos.current) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let timer: number | undefined;

    function updateTimer() {
      window.clearTimeout(timer);
      if (visible && !motion.matches && !document.hidden) {
        timer = window.setTimeout(() => {
          const next = (active + 1) % slides.length;
          setPending(next);
          if (ready.current.has(next)) setActive(next);
          setLoaded((current) => current.includes(next) ? current : [...current, next]);
        }, 3000);
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updateTimer();
    }, { threshold: 0.25 });
    observer.observe(photos.current);
    motion.addEventListener("change", updateTimer);
    document.addEventListener("visibilitychange", updateTimer);

    return () => {
      observer.disconnect();
      motion.removeEventListener("change", updateTimer);
      document.removeEventListener("visibilitychange", updateTimer);
      window.clearTimeout(timer);
    };
  }, [paused, active, loaded]);

  function move(step: number) {
    setPaused(true);
    const next = (active + step + slides.length) % slides.length;
    setLoaded((current) => current.includes(next) ? current : [...current, next]);
    setPending(next);
    if (ready.current.has(next)) setActive(next);
  }

  return (
    <>
      <div ref={photos} className="hero-photos">
        {slides.map(({ src, alt, fit }, index) => loaded.includes(index) && (
          <div key={src} className="hero-slide" data-active={active === index} data-fit={fit}
            aria-hidden={active !== index}>
            <Image className="hero-image" src={src} alt={alt} fill
              sizes={fit === "contain" ? "(max-width: 640px) 260px, 395px" : "100vw"}
              onLoad={() => {
                ready.current.add(index);
                if (pending === index) setActive(index);
              }}
              loading={index === 0 ? undefined : "eager"}
              preload={index === 0} fetchPriority={index === 0 ? undefined : "low"} />
          </div>
        ))}
      </div>
      <div className="hero-controls" role="group" aria-label="Фотографии отеля">
        <button type="button" onClick={() => move(-1)} aria-label="Предыдущее фото на главной">
          <ChevronLeft size={19} aria-hidden="true" />
        </button>
        <span aria-live={paused ? "polite" : "off"}>{active + 1} / {slides.length}</span>
        <button type="button" onClick={() => move(1)} aria-label="Следующее фото на главной">
          <ChevronRight size={19} aria-hidden="true" />
        </button>
        <button type="button" className="hero-autoplay" onClick={() => { setPending(null); setPaused(!paused); }}
          aria-label={paused ? "Продолжить показ фото" : "Приостановить показ фото"}>
          {paused ? <Play size={17} aria-hidden="true" /> : <Pause size={17} aria-hidden="true" />}
        </button>
      </div>
    </>
  );
}
