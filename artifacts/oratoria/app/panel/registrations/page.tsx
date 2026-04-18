import { prisma } from "@/lib/prisma";
import { updateRegistrationStatusAction } from "../actions";

const STATUS_LABELS: Record<string, string> = {
  new: "Новая",
  confirmed: "Подтверждена",
  cancelled: "Отменена",
  attended: "Пришёл/пришла",
  no_show: "Не пришёл",
};

const ALL_STATUSES = Object.keys(STATUS_LABELS);

export default async function RegistrationsPage() {
  const registrations = await prisma.registration.findMany({
    orderBy: { createdAt: "desc" },
    include: { event: { select: { title: true } } },
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[#1c1c1c]">Регистрации</h1>
        <a
          href="/panel/registrations/export"
          className="border border-slate-200 bg-white text-[#1c1c1c] px-4 py-2 rounded-xl text-sm font-medium hover:border-slate-300 transition-colors"
        >
          Экспорт CSV
        </a>
      </div>

      {registrations.length === 0 ? (
        <p className="text-[#6b6b6b] text-center py-20">Регистраций ещё нет</p>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-4 py-3 font-semibold text-[#1c1c1c]">
                    Дата
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-[#1c1c1c]">
                    Мероприятие
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-[#1c1c1c]">
                    Телефон
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-[#1c1c1c]">
                    Email
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-[#1c1c1c]">
                    Рассылка
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-[#1c1c1c]">
                    Статус
                  </th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((reg, i) => (
                  <tr
                    key={reg.id}
                    className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
                  >
                    <td className="px-4 py-3 text-[#6b6b6b] whitespace-nowrap">
                      {new Date(reg.createdAt).toLocaleDateString("ru-RU")}
                    </td>
                    <td className="px-4 py-3 text-[#1c1c1c] max-w-[180px] truncate">
                      {reg.event.title}
                    </td>
                    <td className="px-4 py-3 text-[#1c1c1c]">{reg.phone}</td>
                    <td className="px-4 py-3 text-[#1c1c1c]">{reg.email}</td>
                    <td className="px-4 py-3 text-center">
                      {reg.marketingConsent ? "✓" : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <form action={updateRegistrationStatusAction}>
                        <input type="hidden" name="id" value={reg.id} />
                        <div className="flex items-center gap-2">
                          <select
                            name="status"
                            defaultValue={reg.status}
                            className="border border-slate-200 rounded-lg px-2 py-1 text-xs bg-white focus:outline-none focus:border-[#2d6a4f]"
                          >
                            {ALL_STATUSES.map((s) => (
                              <option key={s} value={s}>
                                {STATUS_LABELS[s]}
                              </option>
                            ))}
                          </select>
                          <button
                            type="submit"
                            className="text-xs text-[#2d6a4f] border border-[#2d6a4f] px-2 py-1 rounded-lg hover:bg-emerald-50 transition-colors"
                          >
                            ОК
                          </button>
                        </div>
                      </form>
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
