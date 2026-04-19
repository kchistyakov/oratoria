import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Условия участия — Оратория",
  description:
    "Условия участия в мероприятиях клуба публичных выступлений Оратория.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-[#1c1c1c] mb-2">
        Условия участия
      </h1>
      <p className="text-sm text-[#9b9b9b] mb-10">
        Последнее обновление: апрель 2026 года
      </p>

      <div className="text-[#4a4a4a] space-y-8 text-sm leading-relaxed">

        {/* 1 */}
        <section>
          <h2 className="text-base font-semibold text-[#1c1c1c] mb-2">
            1. Общие положения
          </h2>
          <p>
            <strong>Оратория</strong> — клуб публичных выступлений в
            Санкт-Петербурге. Настоящие условия регулируют участие в
            мероприятиях клуба и использование сайта. Регистрируясь на
            мероприятие, вы подтверждаете согласие с этими условиями.
          </p>
        </section>

        {/* 2 */}
        <section>
          <h2 className="text-base font-semibold text-[#1c1c1c] mb-2">
            2. Мероприятия и детали участия
          </h2>
          <p>
            Каждое мероприятие клуба имеет собственные параметры: дату, время,
            место проведения и стоимость участия. Актуальная информация
            указывается на карточке мероприятия. Организаторы оставляют за
            собой право изменять отдельные параметры мероприятия (место,
            время, формат) с уведомлением зарегистрированных участников.
          </p>
          <p className="mt-2">
            Стоимость участия указывается отдельно для каждого мероприятия и
            фиксируется на момент регистрации.
          </p>
        </section>

        {/* 3 */}
        <section>
          <h2 className="text-base font-semibold text-[#1c1c1c] mb-2">
            3. Регистрация
          </h2>
          <p>
            Для участия в мероприятии необходимо заполнить регистрационную
            форму на сайте, указав номер телефона и адрес электронной почты.
            Регистрация подтверждается организаторами — информация о
            подтверждении направляется на указанный email или по телефону.
          </p>
          <p className="mt-2">
            Одно место в мероприятии соответствует одной регистрации.
            Количество мест ограничено.
          </p>
        </section>

        {/* 4 */}
        <section>
          <h2 className="text-base font-semibold text-[#1c1c1c] mb-2">
            4. Отмена и изменение регистрации
          </h2>
          <p>
            Если вы не можете посетить мероприятие, сообщите об этом
            организаторам заблаговременно — по email{" "}
            <a
              href="mailto:hello@oratoria.club"
              className="text-[#2d6a4f] underline hover:text-[#40916c]"
            >
              hello@oratoria.club
            </a>{" "}
            или в Telegram.
          </p>
          <p className="mt-2">
            Возврат средств возможен при отмене не позднее чем за 48 часов до
            начала мероприятия. При отмене мероприятия организаторами оплата
            возвращается в полном объёме. Конкретные условия могут уточняться
            для каждого мероприятия отдельно.
          </p>
        </section>

        {/* 5 */}
        <section>
          <h2 className="text-base font-semibold text-[#1c1c1c] mb-2">
            5. Правила поведения
          </h2>
          <p>Участники клуба берут на себя обязательство:</p>
          <ul className="list-disc list-inside space-y-1 pl-1 mt-2">
            <li>
              соблюдать уважительный тон в общении с другими участниками и
              организаторами;
            </li>
            <li>
              не допускать дискриминации по любому признаку;
            </li>
            <li>
              следовать инструкциям и регламенту организаторов во время
              мероприятий;
            </li>
            <li>
              не создавать помех другим участникам.
            </li>
          </ul>
          <p className="mt-3">
            Организаторы вправе отстранить участника от мероприятия при
            нарушении данных правил. В случае грубого нарушения возврат
            средств не производится.
          </p>
        </section>

        {/* 6 */}
        <section>
          <h2 className="text-base font-semibold text-[#1c1c1c] mb-2">
            6. Права организаторов
          </h2>
          <p>Организаторы оставляют за собой право:</p>
          <ul className="list-disc list-inside space-y-1 pl-1 mt-2">
            <li>
              изменять расписание, место или формат мероприятия с
              предварительным уведомлением участников;
            </li>
            <li>
              отменять мероприятие при форс-мажорных обстоятельствах;
            </li>
            <li>
              устанавливать ограничения на количество участников.
            </li>
          </ul>
        </section>

        {/* 7 */}
        <section>
          <h2 className="text-base font-semibold text-[#1c1c1c] mb-2">
            7. Персональные данные
          </h2>
          <p>
            При регистрации и использовании сайта обрабатываются персональные
            данные в соответствии с{" "}
            <Link
              href="/legal/privacy"
              className="text-[#2d6a4f] underline hover:text-[#40916c]"
            >
              Политикой конфиденциальности
            </Link>
            . Предоставляя данные, вы соглашаетесь с условиями их обработки.
          </p>
        </section>

        {/* 8 */}
        <section>
          <h2 className="text-base font-semibold text-[#1c1c1c] mb-2">
            8. Изменение условий
          </h2>
          <p>
            Клуб вправе обновлять настоящие условия. Актуальная версия
            доступна по адресу{" "}
            <Link
              href="/legal/terms"
              className="text-[#2d6a4f] underline hover:text-[#40916c]"
            >
              /legal/terms
            </Link>
            . Продолжение участия в мероприятиях после обновления означает
            принятие новых условий.
          </p>
        </section>

        {/* 9 */}
        <section>
          <h2 className="text-base font-semibold text-[#1c1c1c] mb-2">
            9. Контакты
          </h2>
          <p>
            По всем вопросам, связанным с мероприятиями:
            <br />
            <a
              href="mailto:hello@oratoria.club"
              className="text-[#2d6a4f] underline hover:text-[#40916c]"
            >
              hello@oratoria.club
            </a>
            <br />
            <a
              href="https://t.me/@mashaclubspb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2d6a4f] underline hover:text-[#40916c]"
            >
              Telegram
            </a>
          </p>
        </section>

        <p className="text-xs text-[#9b9b9b] border-t border-[#e9dcc9] pt-6">
          Настоящие условия носят предварительный характер и будут доработаны
          перед официальным публичным запуском клуба.
        </p>
      </div>
    </div>
  );
}
