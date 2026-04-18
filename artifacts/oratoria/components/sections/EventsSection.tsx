/**
 * EventsSection — Server Component
 *
 * Renders the "Ближайшие события" grid on the landing page.
 *
 * v1.0.1: Each event card is now a Client Component (EventCard) that
 * handles the inline registration form. Because Server Components cannot
 * pass non-serializable values (e.g. Date objects) to Client Components
 * as props, this component pre-formats all date/time/price fields into
 * plain strings via the serializeEvent helper before passing them down.
 */

import type { Event } from "@prisma/client";
import { formatEventDate, formatEventTime, formatPrice } from "@/lib/format";
import EventCard from "@/components/EventCard";

interface Props {
  events: Event[];
}

/**
 * Converts a Prisma Event record into a plain object safe for Client Component props.
 * Date fields are formatted to Russian locale strings; no raw Date objects are passed.
 */
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

export default function EventsSection({ events }: Props) {
  return (
    <section id="events" className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-2xl md:text-3xl font-bold text-[#1c1c1c] mb-2"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Ближайшие события
        </h2>
        <p className="text-[#6b6b6b] mb-10">
          Выбери формат, который тебе подходит
        </p>

        {events.length === 0 ? (
          <div className="py-12 text-center border border-[#e9dcc9] rounded-2xl">
            <p className="text-[#6b6b6b] mb-4">
              Скоро появятся новые мероприятия.
            </p>
            <a
              href="#newsletter"
              className="text-[#2d6a4f] underline text-sm hover:text-[#40916c] transition-colors"
            >
              Подпишитесь на рассылку, чтобы не пропустить
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event) => (
              // Pass serialized props — no Date objects cross the server/client boundary
              <EventCard key={event.id} {...serializeEvent(event)} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
