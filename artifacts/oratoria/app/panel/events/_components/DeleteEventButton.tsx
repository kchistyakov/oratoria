"use client";

import { deleteEventAction } from "../../actions";

export default function DeleteEventButton({ id }: { id: string }) {
  return (
    <form
      action={deleteEventAction.bind(null, id)}
      onSubmit={(e) => {
        if (!confirm("Удалить мероприятие? Это действие необратимо."))
          e.preventDefault();
      }}
    >
      <button
        type="submit"
        className="text-sm text-red-600 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
      >
        Удалить
      </button>
    </form>
  );
}
