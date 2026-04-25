import { prisma } from "@/lib/prisma";
import { updateContentAction } from "../actions";

const CONTENT_DESCRIPTIONS: Record<string, string> = {
  hero_title: "Главный заголовок (Hero)",
  hero_subtitle: "Подзаголовок (Hero)",
  slogan: "Слоган клуба (верхняя строка Hero)",
  about_title: 'Заголовок раздела "О клубе"',
  about_body: 'Текст раздела "О клубе"',
  for_whom_title: 'Заголовок раздела "Для кого"',
  for_whom_body: 'Текст раздела "Для кого"',
};

export default async function ContentPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const allContent = await prisma.siteContent.findMany({
    orderBy: { key: "asc" },
  });

  const knownKeys = Object.keys(CONTENT_DESCRIPTIONS);
  const known = allContent.filter((c) => knownKeys.includes(c.key));
  const extra = allContent.filter((c) => !knownKeys.includes(c.key));

  function ContentField({ item }: { item: (typeof allContent)[0] }) {
    const isLong = item.body.length > 80 || item.body.includes("\n");
    return (
      <form action={updateContentAction} className="space-y-2">
        <input type="hidden" name="key" value={item.key} />
        <input type="hidden" name="title" value={item.title} />
        <label className="block text-sm font-medium text-[#1c1c1c]">
          {CONTENT_DESCRIPTIONS[item.key] ?? item.title}
          <span className="ml-2 text-xs text-[#aaa] font-normal">
            {item.key}
          </span>
        </label>
        {isLong ? (
          <textarea
            name="body"
            defaultValue={item.body}
            rows={4}
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#2d6a4f] transition-colors resize-y"
          />
        ) : (
          <input
            name="body"
            type="text"
            defaultValue={item.body}
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#2d6a4f] transition-colors"
          />
        )}
        <button
          type="submit"
          className="text-sm bg-[#2d6a4f] text-white px-4 py-1.5 rounded-lg hover:bg-[#40916c] transition-colors"
        >
          Сохранить
        </button>
      </form>
    );
  }

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-[#1c1c1c] mb-2">Тексты сайта</h1>
      <p className="text-sm text-[#6b6b6b] mb-8">
        Изменения сразу отображаются на публичном сайте.
      </p>

      {saved === "1" && (
        <div className="mb-6 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700">
          Сохранено
        </div>
      )}

      <div className="space-y-6">
        {known.map((item) => (
          <ContentField key={item.key} item={item} />
        ))}

        {extra.length > 0 && (
          <>
            <hr className="border-slate-200" />
            <p className="text-xs font-semibold text-[#aaa] uppercase tracking-wider">
              Дополнительные поля
            </p>
            {extra.map((item) => (
              <ContentField key={item.key} item={item} />
            ))}
          </>
        )}
      </div>

      <div className="mt-12 border-t border-slate-200 pt-8">
        <h2 className="text-base font-semibold text-[#1c1c1c] mb-4">
          Добавить новое поле
        </h2>
        <form action={updateContentAction} className="space-y-3 max-w-md">
          <input
            name="key"
            type="text"
            required
            placeholder="Ключ (например: hero_image_url) *"
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#2d6a4f] transition-colors"
          />
          <input
            name="title"
            type="text"
            placeholder="Название (для отображения в панели)"
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#2d6a4f] transition-colors"
          />
          <input
            name="body"
            type="text"
            placeholder="Значение"
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#2d6a4f] transition-colors"
          />
          <button
            type="submit"
            className="text-sm bg-slate-700 text-white px-4 py-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            Добавить
          </button>
        </form>
      </div>
    </div>
  );
}
