import EventForm from "../_components/EventForm";
import { createEventAction } from "../../actions";

export default function NewEventPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-[#1c1c1c] mb-8">
        Новое мероприятие
      </h1>
      <EventForm action={createEventAction} />
    </div>
  );
}
