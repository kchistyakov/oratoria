import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { COOKIE_NAME, verifySession } from "@/lib/admin-auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value ?? "";
  const ok = await verifySession(token);

  if (!ok) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { eventId } = await params;

  // Verify the event exists
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    select: { title: true, dateTime: true },
  });

  if (!event) {
    return new NextResponse("Not Found", { status: 404 });
  }

  // Fetch only registrations for this event
  const registrations = await prisma.registration.findMany({
    where: { eventId },
    orderBy: { createdAt: "desc" },
  });

  const header = [
    "ID",
    "Дата регистрации",
    "Телефон",
    "Email",
    "Рассылка",
    "Статус",
  ].join(";");

  const rows = registrations.map((r) =>
    [
      r.id,
      new Date(r.createdAt).toLocaleString("ru-RU", {
        timeZone: "Europe/Moscow",
      }),
      r.phone,
      r.email,
      r.marketingConsent ? "Да" : "Нет",
      r.status,
    ].join(";")
  );

  const csv = "\uFEFF" + [header, ...rows].join("\r\n");

  // Use a safe filename based on the event title (strip special chars)
  const safeName = event.title
    .replace(/[^\w\u0400-\u04FF\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 40);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="registrations-${safeName}-${Date.now()}.csv"`,
    },
  });
}
