import { hotel, rooms } from "../../lib/hotel";
import { indexable, siteOrigin } from "../../lib/seo";

export const dynamic = "force-static";

export function GET() {
  if (!indexable) return new Response(null, { status: 404 });

  const content = [
    `# ${hotel.name}`,
    "",
    `> ${hotel.description}`,
    "",
    "## Официальные страницы",
    `- [Об отеле](${siteOrigin}/): адрес, номера, двор и запрос дат.`,
    ...rooms.map(({ slug, name, summary }) => `- [${name}](${siteOrigin}/rooms/${slug}): ${summary}.`),
    "",
    "## Контакты",
    `- [Маршрут и адрес](${hotel.map}): ${hotel.city}, ${hotel.street}.`,
    `- [Запросить даты в WhatsApp](${hotel.whatsapp}).`,
  ];

  return new Response(content.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
