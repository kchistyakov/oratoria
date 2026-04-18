"use client";

import { useActionState } from "react";
import type { Event } from "@prisma/client";

interface Props {
  event?: Event;
  action: (
    prev: unknown,
    formData: FormData
  ) => Promise<{ error?: string }>;
}

function formatLocalDatetime(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}`
  );
}

export default function EventForm({ event, action }: Props) {
  const [state, formAction, pending] = useActionState(action, null);

  return (
    <form action={formAction} className="space-y-5 max-w-xl">
      {event && <input type="hidden" name="id" value={event.id} />}

      {state?.error && (
        <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
          {state.error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-[#1c1c1c] mb-1.5">
          Название <span className="text-red-500">*</span>
        </label>
        <input
          name="title"
          type="text"
          required
          defaultValue={event?.title ?? ""}
          disabled={pending}
          className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#2d6a4f] transition-colors disabled:opacity-50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1c1c1c] mb-1.5">
          Описание <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description"
          rows={4}
          required
          defaultValue={event?.description ?? ""}
          disabled={pending}
          className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#2d6a4f] transition-colors resize-y disabled:opacity-50"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#1c1c1c] mb-1.5">
            Дата и время <span className="text-red-500">*</span>
          </label>
          <input
            name="dateTime"
            type="datetime-local"
            required
            defaultValue={
              event ? formatLocalDatetime(new Date(event.dateTime)) : ""
            }
            disabled={pending}
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#2d6a4f] transition-colors disabled:opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1c1c1c] mb-1.5">
            Цена (₽)
          </label>
          <input
            name="price"
            type="number"
            min={0}
            defaultValue={event?.price ?? 0}
            disabled={pending}
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#2d6a4f] transition-colors disabled:opacity-50"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1c1c1c] mb-1.5">
          Место проведения <span className="text-red-500">*</span>
        </label>
        <input
          name="place"
          type="text"
          required
          defaultValue={event?.place ?? ""}
          disabled={pending}
          className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#2d6a4f] transition-colors disabled:opacity-50"
        />
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          name="isPublished"
          type="checkbox"
          defaultChecked={event?.isPublished ?? false}
          disabled={pending}
          className="w-4 h-4 accent-[#2d6a4f]"
        />
        <span className="text-sm font-medium text-[#1c1c1c]">
          Опубликовать на сайте
        </span>
      </label>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="bg-[#2d6a4f] text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-[#40916c] transition-colors disabled:opacity-50"
        >
          {pending ? "Сохраняем..." : event ? "Сохранить" : "Создать"}
        </button>
        <a
          href="/panel/events"
          className="text-sm text-[#6b6b6b] hover:text-[#1c1c1c] transition-colors"
        >
          Отмена
        </a>
      </div>
    </form>
  );
}
