import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatEventDate, formatEventTime } from "@/lib/format";

export default async function RegistrationsPage() {
  const now = new Date();

  // Fetch all events with their registration counts
  const events = await prisma.event.findMany({
    orderBy: { dateTime: "asc" },
    include: { _count: { select: { registrations: true } } },
  });

  const upcoming = events.filter((e) => e.dateTime >= now);
  const past = events.filter((e) => e.dateTime < now).reverse(); // most recent first

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[#1c1c1c]">Регистрации</h1>
        <a
          href="/panel/registrations/export"
          className="border border-slate-200 bg-white text-[#1c1c1c] px-4 py-2 rounded-xl text-sm font-medium hover:border-slate-300 transition-colors"
        >
          Экспорт всех CSV
        </a>
      </div>

      {events.length === 0 ? (
        <p className="text-[#6b6b6b] text-center py-20">
          Мероприятий ещё нет
        </p>
      ) : (
        <div className="max-w-4xl space-y-10">
          {/* Upcoming events */}
          {upcoming.length > 0 && (
            <section>
              <p className="text-xs font-semibold text-[#aaa] uppercase tracking-wider mb-4">
                Предстоящие
              </p>
              <div className="space-y-3">
                {upcoming.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          )}

          {/* Past events */}
          {past.length > 0 && (
            <section>
              <p className="text-xs font-semibold text-[#aaa] uppercase tracking-wider mb-4">
                Прошедшие
              </p>
              <div className="space-y-3">
                {past.map((event) => (
                  <EventCard key={event.id} event={event} past />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

type EventWithCount = Awaited<
  ReturnType<typeof prisma.event.findMany>
>[number] & { _count: { registrations: number } };

function EventCard({
  event,
  past,
}: {
  event: EventWithCount;
  past?: boolean;
}) {
  const count = event._count.registrations;
  return (
    <Link
      href={`/panel/registrations/${event.id}`}
      className="block bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-shadow hover:border-slate-300"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${
                event.isPublished
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {event.isPublished ? "Опубликовано" : "Черновик"}
            </span>
            {past && (
              <span className="text-xs text-[#aaa]">прошедшее</span>
            )}
          </div>
          <p className="font-semibold text-[#1c1c1c] leading-snug">
            {event.title}
          </p>
          <p className="text-sm text-[#6b6b6b] mt-1">
            {formatEventDate(event.dateTime)},{" "}
            {formatEventTime(event.dateTime)} · {event.place}
          </p>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-2xl font-bold text-[#1c1c1c]">{count}</p>
          <p className="text-xs text-[#6b6b6b]">
            {count === 1
              ? "регистрация"
              : count >= 2 && count <= 4
                ? "регистрации"
                : "регистраций"}
          </p>
        </div>
      </div>
    </Link>
  );
}
