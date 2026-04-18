import type { FaqItem } from "@prisma/client";

interface Props {
  items: FaqItem[];
}

const FALLBACK_FAQ: FaqItem[] = [
  {
    id: "f1",
    question: "Нужен ли опыт публичных выступлений?",
    answer:
      "Нет. Большинство участников начинали с нуля. Некоторые не могли выдавить слова в первый раз — теперь ведут митинги и защищают дипломы.",
    sortOrder: 1,
    isPublished: true,
  },
  {
    id: "f2",
    question: "Как часто проходят встречи?",
    answer:
      "Два-три раза в месяц. Расписание появляется на сайте за две недели до события.",
    sortOrder: 2,
    isPublished: true,
  },
  {
    id: "f3",
    question: "Можно ли участвовать онлайн?",
    answer:
      "Да, часть встреч — в Zoom. Онлайн-формат полноценный, хотя мы всё равно любим живых людей в одной комнате.",
    sortOrder: 3,
    isPublished: true,
  },
  {
    id: "f4",
    question: "Как записаться?",
    answer:
      "Оставьте email в форме подписки — пришлём приглашение на ближайшую встречу и все детали.",
    sortOrder: 4,
    isPublished: true,
  },
];

export default function FaqSection({ items }: Props) {
  const displayItems = items.length > 0 ? items : FALLBACK_FAQ;

  return (
    <section id="faq" className="py-16 px-4 bg-[#f8f4ee]">
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-2xl md:text-3xl font-bold text-[#1c1c1c] mb-10"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Частые вопросы
        </h2>

        <dl>
          {displayItems.map((item, i) => (
            <div
              key={item.id}
              className={`py-6 ${i < displayItems.length - 1 ? "border-b border-[#e9dcc9]" : ""}`}
            >
              <dt className="font-semibold text-[#1c1c1c] mb-2">
                {item.question}
              </dt>
              <dd className="text-[#4a4a4a] text-sm leading-relaxed">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
