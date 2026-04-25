import { prisma } from "@/lib/prisma";

export default async function SubscribersPage() {
  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[#1c1c1c]">
          Подписчики рассылки
        </h1>
        <span className="text-sm text-[#6b6b6b]">
          Всего: {subscribers.length}
        </span>
      </div>

      {subscribers.length === 0 ? (
        <p className="text-[#6b6b6b] text-center py-20">Подписчиков пока нет</p>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden max-w-2xl">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-5 py-3 font-semibold text-[#1c1c1c]">
                  Email
                </th>
                <th className="text-left px-5 py-3 font-semibold text-[#1c1c1c]">
                  Дата подписки
                </th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((sub, i) => (
                <tr
                  key={sub.id}
                  className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
                >
                  <td className="px-5 py-3 text-[#1c1c1c]">{sub.email}</td>
                  <td className="px-5 py-3 text-[#6b6b6b]">
                    {new Date(sub.createdAt).toLocaleDateString("ru-RU", {
                      timeZone: "Europe/Moscow",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
