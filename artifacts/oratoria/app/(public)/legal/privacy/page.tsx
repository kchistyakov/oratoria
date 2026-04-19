import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — Оратория",
  description:
    "Как клуб Оратория собирает, хранит и использует персональные данные участников.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-[#1c1c1c] mb-2">
        Политика конфиденциальности
      </h1>
      <p className="text-sm text-[#9b9b9b] mb-10">
        Последнее обновление: апрель 2026 года
      </p>

      <div className="text-[#4a4a4a] space-y-8 text-sm leading-relaxed">

        {/* 1 */}
        <section>
          <h2 className="text-base font-semibold text-[#1c1c1c] mb-2">
            1. Оператор данных
          </h2>
          <p>
            Настоящая политика описывает, как клуб публичных выступлений{" "}
            <strong>Оратория</strong> (Санкт-Петербург, далее — «Клуб», «мы»)
            обрабатывает персональные данные посетителей сайта и участников
            мероприятий.
          </p>
          <p className="mt-2">
            По всем вопросам, связанным с персональными данными, обращайтесь:
            &nbsp;
            <a
              href="mailto:hello@oratoria.club"
              className="text-[#2d6a4f] underline hover:text-[#40916c]"
            >
              hello@oratoria.club
            </a>
            {" "}или по телефону{" "}
            <a
              href="tel:+79941021321"
              className="text-[#2d6a4f] underline hover:text-[#40916c]"
            >
              +7 994 102-13-21
            </a>
            .
          </p>
        </section>

        {/* 2 */}
        <section>
          <h2 className="text-base font-semibold text-[#1c1c1c] mb-2">
            2. Какие данные мы собираем
          </h2>

          <p className="font-medium text-[#1c1c1c] mt-3 mb-1">
            Регистрация на мероприятие
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li>Номер телефона</li>
            <li>Адрес электронной почты</li>
            <li>Выбранное мероприятие</li>
            <li>
              Согласие на получение анонсов о похожих событиях (опционально,
              отмечается отдельным чекбоксом)
            </li>
          </ul>

          <p className="font-medium text-[#1c1c1c] mt-4 mb-1">
            Подписка на рассылку
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li>Адрес электронной почты</li>
          </ul>

          <p className="mt-3">
            Мы <strong>не собираем</strong> платёжные данные, данные банковских
            карт или финансовую информацию напрямую через сайт.
          </p>
        </section>

        {/* 3 */}
        <section>
          <h2 className="text-base font-semibold text-[#1c1c1c] mb-2">
            3. Цели обработки данных
          </h2>

          <div className="space-y-4">
            <div>
              <p className="font-medium text-[#1c1c1c] mb-1">
                Регистрация на мероприятие
              </p>
              <p>
                Данные используются для подтверждения регистрации, информирования
                участника о деталях мероприятия (время, место, изменения) и
                поддержания контакта с организаторами. Правовое основание —
                выполнение договора / оказание услуги.
              </p>
            </div>

            <div>
              <p className="font-medium text-[#1c1c1c] mb-1">
                Рассылка новостей клуба
              </p>
              <p>
                Email-адрес, переданный при подписке, используется исключительно
                для отправки анонсов мероприятий Оратории. Правовое основание —
                ваше явное согласие (подписка на форме).
              </p>
            </div>

            <div>
              <p className="font-medium text-[#1c1c1c] mb-1">
                Маркетинговые сообщения (с вашего согласия)
              </p>
              <p>
                Если при регистрации на мероприятие вы отметили соответствующий
                чекбокс, мы можем сообщать вам о похожих событиях клуба. Вы
                можете отозвать это согласие в любой момент, написав нам.
              </p>
            </div>
          </div>
        </section>

        {/* 4 */}
        <section>
          <h2 className="text-base font-semibold text-[#1c1c1c] mb-2">
            4. Хранение и защита данных
          </h2>
          <p>
            Данные хранятся в защищённой базе данных на облачных серверах.
            Мы применяем технические и организационные меры для защиты информации
            от несанкционированного доступа.
          </p>
          <p className="mt-2">
            Данные хранятся в течение срока, необходимого для достижения целей,
            указанных выше, либо до тех пор, пока вы не запросите их удаление.
          </p>
        </section>

        {/* 5 */}
        <section>
          <h2 className="text-base font-semibold text-[#1c1c1c] mb-2">
            5. Передача данных третьим лицам
          </h2>
          <p>
            Мы не продаём и не передаём ваши персональные данные третьим лицам в
            коммерческих целях.
          </p>
          <p className="mt-2">
            В будущем для рассылки писем может быть задействован сторонний сервис
            (например, Brevo). В этом случае политика будет обновлена с указанием
            нового оператора.
          </p>
        </section>

        {/* 6 */}
        <section>
          <h2 className="text-base font-semibold text-[#1c1c1c] mb-2">
            6. Cookies и аналитика
          </h2>
          <p>
            Сайт может использовать технические cookies, необходимые для его
            корректной работы. В будущем могут быть добавлены инструменты
            аналитики. О любых изменениях в этой части мы сообщим заблаговременно,
            обновив настоящую политику.
          </p>
        </section>

        {/* 7 */}
        <section>
          <h2 className="text-base font-semibold text-[#1c1c1c] mb-2">
            7. Ваши права
          </h2>
          <p>Вы вправе:</p>
          <ul className="list-disc list-inside space-y-1 pl-1 mt-2">
            <li>запросить доступ к хранящимся о вас данным;</li>
            <li>потребовать исправления неточных данных;</li>
            <li>
              запросить удаление данных (если это не противоречит нашим
              законным обязательствам);
            </li>
            <li>
              отозвать согласие на маркетинговые сообщения в любой момент.
            </li>
          </ul>
          <p className="mt-3">
            Для реализации любого из указанных прав напишите нам:{" "}
            <a
              href="mailto:hello@oratoria.club"
              className="text-[#2d6a4f] underline hover:text-[#40916c]"
            >
              hello@oratoria.club
            </a>
            .
          </p>
        </section>

        {/* 8 */}
        <section>
          <h2 className="text-base font-semibold text-[#1c1c1c] mb-2">
            8. Изменения политики
          </h2>
          <p>
            Мы можем обновлять настоящую политику по мере развития проекта.
            Актуальная версия всегда доступна по адресу{" "}
            <Link
              href="/legal/privacy"
              className="text-[#2d6a4f] underline hover:text-[#40916c]"
            >
              /legal/privacy
            </Link>
            . Дата обновления указана в заголовке страницы.
          </p>
        </section>

        {/* 9 */}
        <section>
          <h2 className="text-base font-semibold text-[#1c1c1c] mb-2">
            9. Контакты
          </h2>
          <p>
            Клуб публичных выступлений Оратория
            <br />
            Санкт-Петербург
            <br />
            <a
              href="mailto:hello@oratoria.club"
              className="text-[#2d6a4f] underline hover:text-[#40916c]"
            >
              hello@oratoria.club
            </a>
            <br />
            <a
              href="tel:+79941021321"
              className="text-[#2d6a4f] underline hover:text-[#40916c]"
            >
              +7 994 102-13-21
            </a>
          </p>
        </section>

        <p className="text-xs text-[#9b9b9b] border-t border-[#e9dcc9] pt-6">
          Настоящая политика носит информационный характер и будет доработана
          перед официальным публичным запуском клуба.
        </p>
      </div>
    </div>
  );
}
