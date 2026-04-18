"use client";

import { useActionState } from "react";
import { loginAction } from "../actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <div className="px-4 w-full max-w-sm">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <div className="mb-8 text-center">
          <p className="font-bold text-xl text-[#1c1c1c]">Оратория</p>
          <p className="text-sm text-[#6b6b6b] mt-1">Вход в панель управления</p>
        </div>

        {state?.error && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1c1c1c] mb-1.5">
              Email
            </label>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={pending}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#2d6a4f] transition-colors disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1c1c1c] mb-1.5">
              Пароль
            </label>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              disabled={pending}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#2d6a4f] transition-colors disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-[#2d6a4f] text-white py-2.5 rounded-xl font-medium text-sm hover:bg-[#40916c] transition-colors disabled:opacity-50 mt-2"
          >
            {pending ? "Входим..." : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
}
