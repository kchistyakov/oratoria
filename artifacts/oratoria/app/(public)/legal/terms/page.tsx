import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Условия использования — Оратория",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-[#1c1c1c] mb-8">
        Условия использования
      </h1>
      <div className="text-[#4a4a4a] space-y-6 text-sm leading-relaxed">
        <p>Последнее обновление: май 2026 года.</p>
        <h2 className="text-lg font-semibold text-[#1c1c1c] mt-6">
          1. Принятие условий
        </h2>
        <p>
          Используя сайт Оратории, вы соглашаетесь с настоящими условиями. Если
          вы не согласны, пожалуйста, прекратите использование сайта.
        </p>
        <h2 className="text-lg font-semibold text-[#1c1c1c] mt-6">
          2. Описание услуг
        </h2>
        <p>
          Оратория предоставляет информацию о мероприятиях по публичным
          выступлениям и обеспечивает возможность регистрации на них. Мы
          оставляем за собой право изменять расписание или отменять мероприятия
          с уведомлением участников.
        </p>
        <h2 className="text-lg font-semibold text-[#1c1c1c] mt-6">
          3. Правила участия
        </h2>
        <p>
          Участники обязуются соблюдать уважительный тон в общении, не
          допускать дискриминации и следовать инструкциям организаторов.
          Организаторы вправе отстранить участника при нарушении правил без
          возврата оплаты.
        </p>
        <h2 className="text-lg font-semibold text-[#1c1c1c] mt-6">
          4. Возврат средств
        </h2>
        <p>
          Возврат оплаты за участие возможен при отмене регистрации не позднее
          чем за 48 часов до начала мероприятия. При отмене мероприятия
          организаторами средства возвращаются полностью.
        </p>
        <h2 className="text-lg font-semibold text-[#1c1c1c] mt-6">
          5. Контакты
        </h2>
        <p>
          По вопросам:{" "}
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
