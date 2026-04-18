const benefits = [
  {
    number: "01",
    title: "Регулярная практика",
    body: "На каждой встрече выступаешь сам. Не смотришь, как другие, — говоришь сам. Только так и растёшь.",
  },
  {
    number: "02",
    title: "Честная обратная связь",
    body: "Тебе скажут, что получилось, а что нет. По-человечески, без жестокости и без лишней похвалы.",
  },
  {
    number: "03",
    title: "Безопасная среда",
    body: "Никто не смеётся над чужими страхами. Все здесь были новичками — некоторые совсем недавно.",
  },
  {
    number: "04",
    title: "Заметный прогресс",
    body: "После 3–4 встреч ты сам почувствуешь разницу. Голос станет увереннее. Слова — яснее. Проверено.",
  },
];

export default function BenefitsSection() {
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
          {benefits.map((b) => (
            <div
              key={b.number}
              className="bg-white rounded-2xl p-6 border border-[#b7e4c7]"
            >
              <p className="text-xs font-mono text-[#40916c] mb-3 tracking-widest">
                {b.number}
              </p>
              <h3 className="font-semibold text-[#1c1c1c] mb-2">{b.title}</h3>
              <p className="text-sm text-[#4a4a4a] leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
