"use client";

import { useState, useActionState } from "react";
import { registerForEvent } from "@/app/actions";
import type { RegistrationState } from "@/app/actions";

const initial: RegistrationState = {
  error: null,
  fieldErrors: {},
  success: false,
  duplicate: false,
};

export interface EventCardProps {
  id: string;
  title: string;
  description: string;
  dateFormatted: string;
  timeFormatted: string;
  place: string;
  priceFormatted: string;
}

export default function EventCard({
  id,
  title,
  description,
  dateFormatted,
  timeFormatted,
  place,
  priceFormatted,
}: EventCardProps) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(registerForEvent, initial);

  return (
    <article className="border border-[#e9dcc9] rounded-2xl p-6 bg-[#fafaf8] hover:shadow-sm transition-shadow flex flex-col">
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-semibold text-[#1c1c1c] leading-snug">{title}</h3>
        <span className="shrink-0 text-sm font-medium text-[#2d6a4f] bg-[#d8f3dc] px-3 py-1 rounded-full">
          {priceFormatted}
        </span>
      </div>

      <p className="text-sm text-[#6b6b6b] leading-relaxed mb-4">{description}</p>

      <div className="text-sm text-[#4a4a4a] space-y-1 mb-5 pt-4 border-t border-[#e9dcc9]">
        <p>
          {dateFormatted}, {timeFormatted}
        </p>
        <p>{place}</p>
      </div>

      <div className="mt-auto">
        {state.success && (
          <div className="rounded-xl bg-[#d8f3dc] border border-[#b7e4c7] px-4 py-4 text-center">
            <p className="text-[#2d6a4f] font-semibold text-sm mb-1">
              Вы зарегистрированы!
            </p>
            <p className="text-[#40916c] text-xs">
              Напишем на вашу почту с деталями.
            </p>
          </div>
        )}

        {state.duplicate && (
          <div className="rounded-xl bg-[#f0faf2] border border-[#74c69d] px-4 py-4 text-center">
            <p className="text-[#2d6a4f] text-sm font-medium">
              Вы уже зарегистрированы на это мероприятие.
            </p>
            <p className="text-[#40916c] text-xs mt-1">
              Если нужна помощь — напишите нам в Telegram.
            </p>
          </div>
        )}

        {!state.success && !state.duplicate && !open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="w-full bg-[#2d6a4f] text-white py-2.5 rounded-full text-sm font-medium hover:bg-[#40916c] transition-colors"
          >
            Записаться
          </button>
        )}

        {!state.success && !state.duplicate && open && (
          <form action={formAction} noValidate className="space-y-3">
            <input type="hidden" name="eventId" value={id} />

            <div>
              <input
                name="phone"
                type="tel"
                placeholder="Телефон"
                autoComplete="tel"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white focus:outline-none focus:border-[#40916c] transition-colors ${
                  state.fieldErrors.phone
                    ? "border-red-400 bg-red-50"
                    : "border-[#e9dcc9]"
                }`}
              />
              {state.fieldErrors.phone && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {state.fieldErrors.phone}
                </p>
              )}
            </div>

            <div>
              <input
                name="email"
                type="email"
                placeholder="Email"
                autoComplete="email"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white focus:outline-none focus:border-[#40916c] transition-colors ${
                  state.fieldErrors.email
                    ? "border-red-400 bg-red-50"
                    : "border-[#e9dcc9]"
                }`}
              />
              {state.fieldErrors.email && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {state.fieldErrors.email}
                </p>
              )}
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                name="marketingConsent"
                type="checkbox"
                className="mt-0.5 shrink-0 accent-[#2d6a4f] w-4 h-4"
              />
              <span className="text-xs text-[#6b6b6b] leading-relaxed">
                Согласен(на) получать анонсы о похожих мероприятиях
              </span>
            </label>

            {state.error && (
              <p className="text-red-500 text-sm">{state.error}</p>
            )}

            <div className="flex gap-2 pt-1">
              <button
                type="submit"
                disabled={pending}
                className="flex-1 bg-[#2d6a4f] text-white py-2.5 rounded-full text-sm font-medium hover:bg-[#40916c] transition-colors disabled:opacity-60"
              >
                {pending ? "Отправляю…" : "Подтвердить"}
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2.5 rounded-full text-sm text-[#6b6b6b] border border-[#e9dcc9] hover:bg-[#f0f0f0] transition-colors"
              >
                Отмена
              </button>
            </div>
          </form>
        )}
      </div>
    </article>
  );
}
