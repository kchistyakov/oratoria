"use client";

/**
 * EventCard — added in v1.0.1
 *
 * Client Component that renders a single event card with an inline
 * registration form. Each card manages its own state independently,
 * so opening one form does not affect the others on the page.
 *
 * State machine:
 *   idle       →  "Записаться" button is shown
 *   open       →  inline form is expanded (phone, email, consent)
 *   success    →  green banner "Вы зарегистрированы!" replaces the form
 *   duplicate  →  teal banner when the same email is already registered
 *                 for this specific event
 *   error      →  per-field or generic message; form stays open for retry
 *
 * Props carry pre-serialized strings (not Date objects) because server
 * components cannot pass non-serializable values to client components.
 */

import { useState, useActionState } from "react";
import Link from "next/link";
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
  /** Pre-formatted date string, e.g. "20 мая" */
  dateFormatted: string;
  /** Pre-formatted time string, e.g. "19:00" */
  timeFormatted: string;
  place: string;
  /** Pre-formatted price string, e.g. "990 ₽" or "Бесплатно" */
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
  // Controls whether the registration form is expanded
  const [open, setOpen] = useState(false);

  // useActionState wires the server action to the form and tracks pending state
  const [state, formAction, pending] = useActionState(registerForEvent, initial);

  return (
    <article className="border border-[#e9dcc9] rounded-2xl p-6 bg-[#fafaf8] hover:shadow-sm transition-shadow flex flex-col">
      {/* ── Card header: title + price badge ─────────────────────────── */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-semibold text-[#1c1c1c] leading-snug">{title}</h3>
        <span className="shrink-0 text-sm font-medium text-[#2d6a4f] bg-[#d8f3dc] px-3 py-1 rounded-full">
          {priceFormatted}
        </span>
      </div>

      <p className="text-sm text-[#6b6b6b] leading-relaxed mb-4">{description}</p>

      {/* ── Event meta: date/time and location ───────────────────────── */}
      <div className="text-sm text-[#4a4a4a] space-y-1 mb-5 pt-4 border-t border-[#e9dcc9]">
        <p>
          {dateFormatted}, {timeFormatted}
        </p>
        <p>{place}</p>
      </div>

      <div className="mt-auto">
        {/* ── Success state ────────────────────────────────────────────── */}
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

        {/* ── Duplicate state: same email already registered for this event */}
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

        {/* ── Idle state: show register button ────────────────────────── */}
        {!state.success && !state.duplicate && !open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="w-full bg-[#2d6a4f] text-white py-2.5 rounded-full text-sm font-medium hover:bg-[#40916c] transition-colors"
          >
            Записаться
          </button>
        )}

        {/* ── Open state: inline registration form ─────────────────────── */}
        {!state.success && !state.duplicate && open && (
          <form action={formAction} noValidate className="space-y-3">
            {/* Hidden field carries the event ID to the server action */}
            <input type="hidden" name="eventId" value={id} />

            {/* Phone */}
            <div>
              <input
                name="phone"
                type="tel"
                placeholder="Телефон"
                autoComplete="tel"
                disabled={pending}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white focus:outline-none focus:border-[#40916c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
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

            {/* Email */}
            <div>
              <input
                name="email"
                type="email"
                placeholder="Email"
                autoComplete="email"
                disabled={pending}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white focus:outline-none focus:border-[#40916c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
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

            {/* Marketing consent checkbox (optional) */}
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                name="marketingConsent"
                type="checkbox"
                className="mt-0.5 shrink-0 accent-[#2d6a4f] w-4 h-4"
              />
              <span className="text-xs text-[#6b6b6b] leading-relaxed">
                Согласен(на) получать анонсы о похожих мероприятиях клуба на
                указанный email. Согласие можно отозвать в любой момент.
              </span>
            </label>

            {/* Generic server error (not a field error) */}
            {state.error && (
              <p className="text-red-500 text-sm">{state.error}</p>
            )}

            {/* Submit + cancel */}
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

            {/* Legal helper text below the submit button */}
            <p className="text-[10px] text-[#9b9b9b] leading-relaxed pt-0.5">
              Нажимая «Подтвердить», вы соглашаетесь с{" "}
              <Link
                href="/legal/terms"
                className="underline hover:text-[#4a4a4a] transition-colors"
              >
                условиями участия
              </Link>{" "}
              и подтверждаете ознакомление с{" "}
              <Link
                href="/legal/privacy"
                className="underline hover:text-[#4a4a4a] transition-colors"
              >
                политикой конфиденциальности
              </Link>
              .
            </p>
          </form>
        )}
      </div>
    </article>
  );
}
