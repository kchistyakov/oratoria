import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EventForm from "../_components/EventForm";
import { updateEventAction } from "../../actions";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditEventPage({ params }: Props) {
  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) notFound();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-[#1c1c1c] mb-8">
        Редактировать мероприятие
      </h1>
      <EventForm event={event} action={updateEventAction} />
    </div>
  );
}
