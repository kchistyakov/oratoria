import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatEventDate, formatEventTime, formatPrice } from "@/lib/format";
import StatusSelector from "../_components/StatusSelector";

interface Props {
  params: Promise<{ eventId: string }>;
}

export default async function EventRegistrationsPage({ params }: Props) {
  const { eventId } = await params;

  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: {
      registrations: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!event) notFound();

  const regs = event.registrations;

  return (
    <div className="p-8">
      {/* Back link */}
      <Link
        href="/panel/registrations"
        className="inline-flex items-center gap-1 text-sm text-[#6b6b6b] hover:text-[#1c1c1c] transition-colors mb-6"
      >
        ← Все мероприятия
      </Link>

      {/* Event info */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-8 max-w-3xl">
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${
              event.isPublished
                ? "bg-emerald-50 text-emerald-700"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {event.isPublished ? "Опубликовано" : "Черновик"}
          </span>
        </div>
        <h1 className="text-xl font-bold text-[#1c1c1c] mb-1">{event.title}</h1>
        <p className="text-sm text-[#6b6b6b]">
          {formatEventDate(event.dateTime)}, {formatEventTime(event.dateTime)} ·{" "}
          {event.place} · {formatPrice(event.price)}
        </p>
      </div>

      {/* Registrations table header */}
      <div className="flex items-center justify-between mb-4 max-w-5xl">
        <p className="text-sm font-semibold text-[#1c1c1c]">
          {regs.length === 0
            ? "Нет регистраций"
            : regs.length === 1
              ? "1 регистрация"
              : regs.length >= 2 && regs.length <= 4
                ? `${regs.length} регистрации`
                : `${regs.length} регистраций`}
        </p>
        {regs.length > 0 && (
          <a
            href={`/panel/registrations/${eventId}/export`}
            className="border border-slate-200 bg-white text-[#1c1c1c] px-4 py-2 rounded-xl text-sm font-medium hover:border-slate-300 transition-colors"
          >
            Экспорт CSV
          </a>
        )}
      </div>

      {/* Registrations table */}
      {regs.length === 0 ? (
        <p className="text-[#6b6b6b] text-center py-16">
          На это мероприятие ещё никто не записался
        </p>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden max-w-5xl">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-4 py-3 font-semibold text-[#1c1c1c]">
                    Дата записи
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-[#1c1c1c]">
                    Телефон
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-[#1c1c1c]">
                    Email
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-[#1c1c1c]">
                    Рассылка
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-[#1c1c1c]">
                    Статус
                  </th>
                </tr>
              </thead>
              <tbody>
                {regs.map((reg, i) => (
                  <tr
                    key={reg.id}
                    className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
                  >
                    <td className="px-4 py-3 text-[#6b6b6b] whitespace-nowrap">
                      {new Date(reg.createdAt).toLocaleString("ru-RU", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZone: "Europe/Moscow",
                      })}
                    </td>
                    <td className="px-4 py-3 text-[#1c1c1c] whitespace-nowrap">
                      {reg.phone}
                    </td>
                    <td className="px-4 py-3 text-[#1c1c1c]">{reg.email}</td>
                    <td className="px-4 py-3 text-center text-[#1c1c1c]">
                      {reg.marketingConsent ? "✓" : "—"}
                    </td>
                    <td className="px-4 py-3">
                      {/* key includes status so the component remounts after save,
                          showing the updated status from the DB */}
                      <StatusSelector
                        key={reg.id + reg.status}
                        registrationId={reg.id}
                        eventId={eventId}
                        currentStatus={reg.status}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
