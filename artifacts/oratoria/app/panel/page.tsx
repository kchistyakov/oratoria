import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const [eventsCount, regsTotal, regsNew, subscribersCount] =
    await Promise.all([
      prisma.event.count({ where: { isPublished: true } }),
      prisma.registration.count(),
      prisma.registration.count({ where: { status: "new" } }),
      prisma.newsletterSubscriber.count(),
    ]);

  const stats = [
    {
      label: "Опубликованных мероприятий",
      value: eventsCount,
      href: "/panel/events",
    },
    {
      label: "Всего регистраций",
      value: regsTotal,
      href: "/panel/registrations",
    },
    {
      label: "Новых регистраций",
      value: regsNew,
      href: "/panel/registrations",
      highlight: regsNew > 0,
    },
    {
      label: "Подписчиков рассылки",
      value: subscribersCount,
      href: "/panel/subscribers",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-[#1c1c1c] mb-8">Дашборд</h1>

      <div className="grid grid-cols-2 gap-4 mb-10 max-w-2xl">
        {stats.map((s) => (
          <a
            key={s.label}
            href={s.href}
            className={`block bg-white border rounded-2xl p-6 hover:shadow-md transition-shadow ${
              s.highlight ? "border-[#2d6a4f]" : "border-slate-200"
            }`}
          >
            <p
              className={`text-4xl font-bold mb-2 ${
                s.highlight ? "text-[#2d6a4f]" : "text-[#1c1c1c]"
              }`}
            >
              {s.value}
            </p>
            <p className="text-sm text-[#6b6b6b]">{s.label}</p>
          </a>
        ))}
      </div>

      <div className="max-w-2xl">
        <h2 className="text-base font-semibold text-[#1c1c1c] mb-4">
          Быстрые действия
        </h2>
        <div className="flex flex-wrap gap-3">
          <a
            href="/panel/events/new"
            className="bg-[#2d6a4f] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#40916c] transition-colors"
          >
            + Новое мероприятие
          </a>
          <a
            href="/panel/registrations"
            className="border border-slate-200 bg-white text-[#1c1c1c] px-4 py-2 rounded-xl text-sm font-medium hover:border-slate-300 transition-colors"
          >
            Посмотреть регистрации
          </a>
          <a
            href="/panel/content"
            className="border border-slate-200 bg-white text-[#1c1c1c] px-4 py-2 rounded-xl text-sm font-medium hover:border-slate-300 transition-colors"
          >
            Редактировать тексты
          </a>
        </div>
      </div>
    </div>
  );
}
