"use client";

import { useActionState } from "react";
import { subscribeToNewsletter, type NewsletterState } from "@/app/actions";

const initialState: NewsletterState = { error: null, success: false };

export default function NewsletterForm() {
  const [state, formAction, isPending] = useActionState(
    subscribeToNewsletter,
    initialState
  );

  if (state.success) {
    return (
      <p className="text-[#d8f3dc] text-lg py-4 text-center">
        Отлично — письма уже летят в вашу сторону.
      </p>
    );
  }

  return (
    <div className="mt-6">
      <form
        action={formAction}
        className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      >
        <input
          name="email"
          type="email"
          placeholder="ваш@email.ru"
          required
          className="flex-1 px-5 py-3 rounded-full bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:border-[#74c69d] focus:bg-white/20 transition-colors"
        />
        <button
          type="submit"
          disabled={isPending}
          className="shrink-0 bg-white text-[#2d6a4f] px-6 py-3 rounded-full font-medium hover:bg-[#d8f3dc] transition-colors disabled:opacity-60"
        >
          {isPending ? "…" : "Подписаться"}
        </button>
      </form>
      {state.error && (
        <p className="text-red-300 text-sm mt-3 text-center">{state.error}</p>
      )}
    </div>
  );
}
