import { prisma } from "@/lib/prisma";
import {
  createBenefitAction,
  updateBenefitAction,
  deleteBenefitAction,
} from "../actions";

export default async function BenefitsPage() {
  const items = await prisma.benefit.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-[#1c1c1c] mb-2">Преимущества</h1>
      <p className="text-sm text-[#6b6b6b] mb-8">
        Карточки в разделе «Зачем вообще приходить?». Изменения сразу отображаются на сайте.
      </p>

      <div className="space-y-4 mb-12">
        {items.length === 0 && (
          <p className="text-[#6b6b6b] text-sm">Карточек ещё нет.</p>
        )}

        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-slate-200 rounded-2xl p-5"
          >
            <form action={updateBenefitAction} className="space-y-3">
              <input type="hidden" name="id" value={item.id} />

              <div className="grid grid-cols-[80px_1fr_80px] gap-3">
                <input
                  name="number"
                  type="text"
                  defaultValue={item.number}
                  placeholder="№ (01)"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#2d6a4f] transition-colors text-center font-mono"
                />
                <input
                  name="title"
                  type="text"
                  defaultValue={item.title}
                  placeholder="Заголовок"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#2d6a4f] transition-colors font-medium"
                />
                <input
                  name="sortOrder"
                  type="number"
                  defaultValue={item.sortOrder}
                  placeholder="Порядок"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#2d6a4f] transition-colors text-center"
                />
              </div>

              <textarea
                name="body"
                defaultValue={item.body}
                rows={2}
                placeholder="Описание"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#2d6a4f] transition-colors resize-y"
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-[#1c1c1c]">
                  <input
                    name="isPublished"
                    type="checkbox"
                    defaultChecked={item.isPublished}
                    className="accent-[#2d6a4f]"
                  />
                  Опубликована
                </label>

                <button
                  type="submit"
                  className="text-sm bg-[#2d6a4f] text-white px-4 py-1.5 rounded-lg hover:bg-[#40916c] transition-colors"
                >
                  Сохранить
                </button>
              </div>
            </form>

            <form
              action={deleteBenefitAction.bind(null, item.id)}
              className="mt-3 pt-3 border-t border-slate-100"
            >
              <button
                type="submit"
                className="text-xs text-red-500 hover:text-red-700 transition-colors"
              >
                Удалить эту карточку
              </button>
            </form>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 pt-8">
        <h2 className="text-base font-semibold text-[#1c1c1c] mb-4">
          Добавить карточку
        </h2>
        <form
          action={createBenefitAction}
          className="space-y-3 bg-white border border-slate-200 rounded-2xl p-5"
        >
          <div className="grid grid-cols-[80px_1fr_80px] gap-3">
            <input
              name="number"
              type="text"
              placeholder="№ (05)"
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#2d6a4f] transition-colors text-center font-mono"
            />
            <input
              name="title"
              type="text"
              required
              placeholder="Заголовок *"
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#2d6a4f] transition-colors"
            />
            <input
              name="sortOrder"
              type="number"
              defaultValue={items.length + 1}
              placeholder="Порядок"
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#2d6a4f] transition-colors text-center"
            />
          </div>
          <textarea
            name="body"
            required
            rows={2}
            placeholder="Описание *"
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#2d6a4f] transition-colors resize-y"
          />
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-[#1c1c1c]">
              <input
                name="isPublished"
                type="checkbox"
                defaultChecked
                className="accent-[#2d6a4f]"
              />
              Опубликована
            </label>
            <button
              type="submit"
              className="text-sm bg-[#2d6a4f] text-white px-5 py-2 rounded-lg hover:bg-[#40916c] transition-colors"
            >
              Добавить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
