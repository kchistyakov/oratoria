import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatEventDate, formatEventTime, formatPrice } from "@/lib/format";
import DeleteEventButton from "./_components/DeleteEventButton";

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { dateTime: "asc" },
    include: { _count: { select: { registrations: true } } },
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[#1c1c1c]">Мероприятия</h1>
        <Link
          href="/panel/events/new"
          className="bg-[#2d6a4f] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#40916c] transition-colors"
        >
          + Новое
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-20 text-[#6b6b6b]">
          <p className="text-lg mb-4">Мероприятий ещё нет</p>
          <Link
            href="/panel/events/new"
            className="text-[#2d6a4f] underline text-sm"
          >
            Создать первое
          </Link>
        </div>
      ) : (
        <div className="space-y-3 max-w-4xl">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 flex items-start gap-4"
            >
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
                  <span className="text-xs text-[#6b6b6b]">
                    {event._count.registrations === 1
                      ? "1 регистрация"
                      : event._count.registrations >= 2 &&
                          event._count.registrations <= 4
                        ? `${event._count.registrations} регистрации`
                        : `${event._count.registrations} регистраций`}
                  </span>
                </div>
                <p className="font-semibold text-[#1c1c1c] leading-snug">
                  {event.title}
                </p>
                <p className="text-sm text-[#6b6b6b] mt-1">
                  {formatEventDate(event.dateTime)},{" "}
                  {formatEventTime(event.dateTime)} · {event.place} ·{" "}
                  {formatPrice(event.price)}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/panel/events/${event.id}`}
                  className="text-sm text-[#2d6a4f] border border-[#2d6a4f] px-3 py-1.5 rounded-lg hover:bg-emerald-50 transition-colors"
                >
                  Изменить
                </Link>
                <DeleteEventButton id={event.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
