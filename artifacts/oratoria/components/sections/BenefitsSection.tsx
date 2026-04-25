import type { Benefit } from "@prisma/client";

const FALLBACK_BENEFITS: Benefit[] = [
  {
    id: "b1",
    number: "01",
    title: "Регулярная практика",
    body: "На каждой встрече выступаешь сам. Не смотришь, как другие, — говоришь сам. Только так и растёшь.",
    sortOrder: 1,
    isPublished: true,
  },
  {
    id: "b2",
    number: "02",
    title: "Честная обратная связь",
    body: "Тебе скажут, что получилось, а что нет. По-человечески, без жестокости и без лишней похвалы.",
    sortOrder: 2,
    isPublished: true,
  },
  {
    id: "b3",
    number: "03",
    title: "Безопасная среда",
    body: "Никто не смеётся над чужими страхами. Все здесь были новичками — некоторые совсем недавно.",
    sortOrder: 3,
    isPublished: true,
  },
  {
    id: "b4",
    number: "04",
    title: "Заметный прогресс",
    body: "После 3–4 встреч ты сам почувствуешь разницу. Голос станет увереннее. Слова — яснее. Проверено.",
    sortOrder: 4,
    isPublished: true,
  },
];

interface Props {
  benefits: Benefit[];
}

export default function BenefitsSection({ benefits }: Props) {
  const displayItems = benefits.length > 0 ? benefits : FALLBACK_BENEFITS;

  return (
    <section className="py-16 px-4 bg-[#d8f3dc]">
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-2xl md:text-3xl font-bold text-[#1c1c1c] mb-10"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Зачем вообще приходить?
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {displayItems.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-2xl p-6 border border-[#b7e4c7]"
            >
              {b.number && (
                <p className="text-xs font-mono text-[#40916c] mb-3 tracking-widest">
                  {b.number}
                </p>
              )}
              <h3 className="font-semibold text-[#1c1c1c] mb-2">{b.title}</h3>
              <p className="text-sm text-[#4a4a4a] leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
