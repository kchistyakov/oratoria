import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — Оратория",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-[#1c1c1c] mb-8">
        Политика конфиденциальности
      </h1>
      <div className="prose text-[#4a4a4a] space-y-6 text-sm leading-relaxed">
        <p>Последнее обновление: май 2026 года.</p>
        <h2 className="text-lg font-semibold text-[#1c1c1c] mt-6">
          1. Какие данные мы собираем
        </h2>
        <p>
          При регистрации на мероприятия мы собираем адрес электронной почты и
          номер телефона. При подписке на рассылку — только адрес электронной
          почты. Мы не собираем платёжные данные напрямую.
        </p>
        <h2 className="text-lg font-semibold text-[#1c1c1c] mt-6">
          2. Как мы используем данные
        </h2>
        <p>
          Данные используются исключительно для подтверждения участия в
          мероприятиях, отправки информационных сообщений и улучшения качества
          наших услуг. Мы не передаём ваши данные третьим лицам в коммерческих
          целях.
        </p>
        <h2 className="text-lg font-semibold text-[#1c1c1c] mt-6">
          3. Хранение данных
        </h2>
        <p>
          Данные хранятся на защищённых серверах. Вы можете в любой момент
          запросить удаление своих данных, написав нам на электронную почту.
        </p>
        <h2 className="text-lg font-semibold text-[#1c1c1c] mt-6">
          4. Контакты
        </h2>
        <p>
          По вопросам конфиденциальности:{" "}
          <a
            href="mailto:hello@oratoria.club"
            className="text-[#2d6a4f] underline hover:text-[#40916c]"
          >
            hello@oratoria.club
          </a>
        </p>
      </div>
    </div>
  );
}
