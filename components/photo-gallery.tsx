"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useRef, useState } from "react";
import { photoGroups } from "../lib/photos";

const photos = photoGroups.flatMap(({ photos }) => [...photos]);

export function PhotoGallery() {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const [group, setGroup] = useState<string | null>(null);
  const [current, setCurrent] = useState(0);
  const visibleGroups = photoGroups.filter(({ name }) => !group || name === group);
  const visiblePhotos = visibleGroups.flatMap(({ photos }) => [...photos]);
  const [id, alt] = visiblePhotos[current] ?? photos[0];

  function move(step: number) {
    setCurrent((index) => (index + step + visiblePhotos.length) % visiblePhotos.length);
  }

  return (
    <section id="gallery" className="wrap gallery" aria-labelledby="gallery-title">
      <div className="section-heading">
        <h2 id="gallery-title">Фотогалерея</h2>
        <p>Номера, двор и фасад Archa Apart Hotel</p>
      </div>
      <div className="gallery-filters" role="group" aria-label="Разделы фотогалереи">
        <button type="button" aria-pressed={group === null} onClick={() => setGroup(null)}>Все фото</button>
        {photoGroups.map(({ name }) => (
          <button type="button" key={name} aria-pressed={group === name}
            onClick={() => setGroup(name)}>{name}</button>
        ))}
      </div>
      <div className="gallery-grid">
        {visiblePhotos.map(([photoId, description], index) => (
          <button type="button" className="gallery-photo" key={photoId}
            aria-label={`Открыть фото: ${description}`}
            onClick={(event) => {
              opener.current = event.currentTarget;
              setCurrent(index);
              dialog.current?.showModal();
            }}>
            <Image src={`/images/${photoId}.webp`} alt={description} fill
              sizes="(max-width: 640px) 45vw, (max-width: 1000px) 30vw, 310px" />
          </button>
        ))}
      </div>
      <dialog ref={dialog} className="gallery-dialog" aria-label="Просмотр фотографии"
        onClose={() => opener.current?.focus()}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            move(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}>
        <div className="gallery-viewer">
          <button type="button" className="gallery-close" aria-label="Закрыть просмотр"
            onClick={() => dialog.current?.close()} autoFocus><X /></button>
          <div className="gallery-full-photo">
            <Image src={`/images/${id}.webp`} alt={alt} fill sizes="(max-width: 960px) 95vw, 960px" />
          </div>
          <div className="gallery-controls">
            <button type="button" onClick={() => move(-1)} aria-label="Предыдущее фото"><ChevronLeft /></button>
            <p aria-live="polite">{alt} · {current + 1} / {visiblePhotos.length}</p>
            <button type="button" onClick={() => move(1)} aria-label="Следующее фото"><ChevronRight /></button>
          </div>
        </div>
      </dialog>
    </section>
  );
}
