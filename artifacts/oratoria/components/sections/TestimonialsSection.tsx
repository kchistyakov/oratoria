import type { Testimonial } from "@prisma/client";

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Мария К.",
    role: "Менеджер проектов, 34 года",
    quote:
      "Пришла с трясущимися руками. Ушла с трясущимися, но счастливыми. На третью встречу руки уже не дрожали.",
    sortOrder: 1,
    isPublished: true,
  },
  {
    id: "t2",
    name: "Дмитрий Л.",
    role: "Разработчик, 28 лет",
    quote:
      "Программист, который говорит вслух — это было про меня. Теперь провожу демо без паники. Почти.",
    sortOrder: 2,
    isPublished: true,
  },
  {
    id: "t3",
    name: "Анна С.",
    role: "Врач, 41 год",
    quote:
      "Умела объяснять симптомы пациентам. Научилась говорить перед любой аудиторией. Оказывается, это разные навыки.",
    sortOrder: 3,
    isPublished: true,
  },
];

interface Props {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: Props) {
  const displayItems =
    testimonials.length > 0 ? testimonials : FALLBACK_TESTIMONIALS;

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-2xl md:text-3xl font-bold text-[#1c1c1c] mb-10"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Что говорят участники
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {displayItems.map((t) => (
            <figure
              key={t.id}
              className="border border-[#e9dcc9] rounded-2xl p-6 bg-[#fafaf8] flex flex-col"
            >
              <div
                className="text-[#74c69d] text-4xl leading-none mb-4 select-none"
                aria-hidden
              >
                ❝
              </div>
              <blockquote className="flex-1">
                <p className="text-[#4a4a4a] text-sm leading-relaxed mb-5">
                  {t.quote}
                </p>
              </blockquote>
              <figcaption>
                <p className="font-semibold text-[#1c1c1c] text-sm">{t.name}</p>
                {t.role && (
                  <p className="text-[#6b6b6b] text-xs">{t.role}</p>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
