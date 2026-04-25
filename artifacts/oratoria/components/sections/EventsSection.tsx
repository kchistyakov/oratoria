import type { Event } from "@prisma/client";
import { formatEventDate, formatEventTime, formatPrice } from "@/lib/format";
import EventCard from "@/components/EventCard";

interface Props {
  events: Event[];
  subtitle?: string;
}

function serializeEvent(e: Event) {
  return {
    id: e.id,
    title: e.title,
    description: e.description,
    dateFormatted: formatEventDate(e.dateTime),
    timeFormatted: formatEventTime(e.dateTime),
    place: e.place,
    priceFormatted: formatPrice(e.price),
  };
}

export default function EventsSection({ events, subtitle }: Props) {
  return (
    <section id="events" className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-2xl md:text-3xl font-bold text-[#1c1c1c] mb-2"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Ближайшие события
        </h2>
        {subtitle && (
          <p className="text-[#6b6b6b] mb-10">{subtitle}</p>
        )}
        {!subtitle && <div className="mb-10" />}

        {events.length === 0 ? (
          <div className="py-12 text-center border border-[#e9dcc9] rounded-2xl">
            <p className="text-[#6b6b6b] mb-4">
              Скоро анонсируем следующие встречи.
            </p>
            <a
              href="#newsletter"
              className="text-[#2d6a4f] underline text-sm hover:text-[#40916c] transition-colors"
            >
              Подпишитесь, чтобы узнать первыми
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} {...serializeEvent(event)} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
