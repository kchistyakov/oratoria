export default function HomePage() {
  return (
    <div>
      <section className="bg-[#1a3a5c] text-white py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Говорите уверенно.<br />
            Убеждайте эффективно.
          </h1>
          <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
            Оратория — клуб публичных выступлений для всех, кто хочет
            развить навыки коммуникации, научиться говорить перед аудиторией
            и стать более убедительным.
          </p>
          <a
            href="#events"
            className="inline-block bg-[#c8a96e] text-[#1a3a5c] font-semibold px-8 py-3 rounded hover:bg-[#b8955a] transition-colors"
          >
            Посмотреть мероприятия
          </a>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1a3a5c] mb-8 text-center">
            Почему Оратория?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Практика",
                text: "Регулярные встречи с реальными выступлениями и конструктивной обратной связью.",
              },
              {
                title: "Сообщество",
                text: "Поддерживающая среда единомышленников, которые хотят расти вместе с вами.",
              },
              {
                title: "Результат",
                text: "Уверенность в себе, чёткость мысли и умение держать внимание аудитории.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center px-4">
                <h3 className="text-lg font-semibold text-[#1a3a5c] mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="events" className="py-16 px-4 bg-[#fafaf8]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1a3a5c] mb-8">
            Ближайшие мероприятия
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Вводная встреча: как начать выступать",
                date: "15 мая 2026",
                place: "Москва, ул. Тверская, 12",
                price: "Бесплатно",
              },
              {
                title: "Мастер-класс: работа с голосом",
                date: "22 мая 2026",
                place: "Онлайн (Zoom)",
                price: "990 ₽",
              },
              {
                title: "Открытый микрофон: первые шаги",
                date: "1 июня 2026",
                place: "Москва, коворкинг «Точка»",
                price: "490 ₽",
              },
              {
                title: "Интенсив: 60 минут без страха",
                date: "7 июня 2026",
                place: "Москва, ул. Арбат, 8",
                price: "1 500 ₽",
              },
            ].map((event) => (
              <div
                key={event.title}
                className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm"
              >
                <h3 className="font-semibold text-[#1a3a5c] mb-2">{event.title}</h3>
                <p className="text-sm text-gray-500 mb-1">📅 {event.date}</p>
                <p className="text-sm text-gray-500 mb-3">📍 {event.place}</p>
                <p className="text-sm font-medium text-[#c8a96e]">{event.price}</p>
                <button className="mt-4 w-full bg-[#1a3a5c] text-white py-2 rounded text-sm hover:bg-[#2a5a8c] transition-colors">
                  Записаться
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1a3a5c] mb-8">
            Частые вопросы
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Нужен ли опыт публичных выступлений?",
                a: "Нет. Мы рады новичкам — большинство участников начинали с нуля. Каждый идёт в своём темпе.",
              },
              {
                q: "Как часто проходят встречи?",
                a: "Обычно два-три раза в месяц. Расписание публикуется на сайте за две недели до события.",
              },
              {
                q: "Можно ли участвовать онлайн?",
                a: "Да, часть мероприятий проходит в формате Zoom. Онлайн-участие полноценное и не хуже очного.",
              },
              {
                q: "Как записаться?",
                a: "Нажмите «Записаться» рядом с любым мероприятием и заполните короткую форму. Мы подтвердим участие по email.",
              },
            ].map((item) => (
              <div key={item.q} className="border-b border-gray-100 pb-6">
                <h3 className="font-semibold text-[#1a3a5c] mb-2">{item.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
