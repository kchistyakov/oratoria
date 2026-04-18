import type { Event } from "@prisma/client";
import { formatEventDate, formatEventTime, formatPrice } from "@/lib/format";

interface Props {
  events: Event[];
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
              <article
                key={event.id}
                className="border border-[#e9dcc9] rounded-2xl p-6 bg-[#fafaf8] hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-semibold text-[#1c1c1c] leading-snug">
                    {event.title}
                  </h3>
                  <span className="shrink-0 text-sm font-medium text-[#2d6a4f] bg-[#d8f3dc] px-3 py-1 rounded-full">
                    {formatPrice(event.price)}
                  </span>
                </div>

                <p className="text-sm text-[#6b6b6b] leading-relaxed mb-4">
                  {event.description}
                </p>

                <div className="text-sm text-[#4a4a4a] space-y-1 mb-5 pt-4 border-t border-[#e9dcc9]">
                  <p>
                    <time dateTime={event.dateTime.toISOString()}>
                      {formatEventDate(event.dateTime)},{" "}
                      {formatEventTime(event.dateTime)}
                    </time>
                  </p>
                  <p>{event.place}</p>
                </div>

                <a
                  href="#newsletter"
                  className="block text-center bg-[#2d6a4f] text-white py-2.5 rounded-full text-sm font-medium hover:bg-[#40916c] transition-colors"
                >
                  Записаться
                </a>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
