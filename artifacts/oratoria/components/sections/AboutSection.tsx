type ContentMap = Record<string, string>;

interface Props {
  content: ContentMap;
}

export default function AboutSection({ content }: Props) {
  const title = content.about_title ?? "Что такое Оратория";
  const body =
    content.about_body ??
    "Оратория — клуб публичных выступлений в Санкт-Петербурге. Мы собираемся раз в две недели: говорим вслух, слушаем друг друга, разбираем выступления. Без мотивационных речей и бизнес-тренеров в пиджаках.";
  const forWhomTitle = content.for_whom_title ?? "Для кого?";
  const forWhomBody =
    content.for_whom_body ??
    "Для тех, кто замирает, когда нужно высказаться на совещании. Для тех, кто хочет защитить диплом без дрожащего голоса. Для тех, кто просто хочет объясняться яснее — с коллегами, друзьями или начальником.";

  return (
    <section id="about" className="py-16 px-4 bg-[#f8f4ee]">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2
              className="text-2xl md:text-3xl font-bold text-[#1c1c1c] mb-6"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {title}
            </h2>
            <p className="text-[#4a4a4a] leading-relaxed">{body}</p>
          </div>

          <div>
            <h3
              className="text-xl font-bold text-[#1c1c1c] mb-4"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {forWhomTitle}
            </h3>
            <p className="text-[#4a4a4a] leading-relaxed">{forWhomBody}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
