"use client";

import { useState } from "react";
import { updateRegistrationStatusAction } from "@/app/panel/actions";

export const STATUS_LABELS: Record<string, string> = {
  new: "Новая",
  confirmed: "Подтверждена",
  cancelled: "Отменена",
  attended: "Пришёл/пришла",
  no_show: "Не пришёл",
};

export const ALL_STATUSES = Object.keys(STATUS_LABELS);

interface Props {
  registrationId: string;
  eventId: string;
  currentStatus: string;
}

// Controlled select that tracks the chosen value in local state.
// Using `value` (not `defaultValue`) prevents React from resetting the
// dropdown back to the default when the Server Action re-renders the page.
// The `key` prop on this component (set by the parent to include the status)
// causes a remount when the server returns a new status after saving.
export default function StatusSelector({
  registrationId,
  eventId,
  currentStatus,
}: Props) {
  const [status, setStatus] = useState(currentStatus);

  return (
    <form action={updateRegistrationStatusAction}>
      <input type="hidden" name="id" value={registrationId} />
      <input type="hidden" name="eventId" value={eventId} />
      <div className="flex items-center gap-2">
        <select
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-slate-200 rounded-lg px-2 py-1 text-xs bg-white focus:outline-none focus:border-[#2d6a4f]"
        >
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="text-xs text-[#2d6a4f] border border-[#2d6a4f] px-2 py-1 rounded-lg hover:bg-emerald-50 transition-colors"
        >
          ОК
        </button>
      </div>
    </form>
  );
}
