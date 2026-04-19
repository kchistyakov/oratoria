"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const STORAGE_KEY = "oratoria_cookie_notice_dismissed";

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Уведомление об использовании cookies"
      className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pointer-events-none"
    >
      <div className="max-w-2xl mx-auto bg-[#1c1c1c] text-white rounded-2xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 shadow-xl pointer-events-auto">
        <p className="text-sm text-white/80 flex-1 leading-relaxed">
          Сайт использует технические cookies для корректной работы. В будущем
          могут быть добавлены аналитические инструменты. Подробнее —{" "}
          <Link
            href="/legal/privacy"
            className="underline text-[#74c69d] hover:text-[#b7e4c7] transition-colors"
          >
            Политика конфиденциальности
          </Link>
          .
        </p>
        <button
          onClick={dismiss}
          className="shrink-0 bg-white text-[#1c1c1c] text-sm font-medium px-4 py-2 rounded-full hover:bg-[#d8f3dc] transition-colors"
        >
          Понятно
        </button>
      </div>
    </div>
  );
}
