import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { COOKIE_NAME, verifySession } from "@/lib/admin-auth";

export async function GET(_req: NextRequest) {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value ?? "";
  const ok = await verifySession(token);

  if (!ok) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const registrations = await prisma.registration.findMany({
    orderBy: { createdAt: "desc" },
    include: { event: { select: { title: true, dateTime: true } } },
  });

  const header = [
    "ID",
    "Дата регистрации",
    "Мероприятие",
    "Дата мероприятия",
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
      `"${r.event.title.replace(/"/g, '""')}"`,
      new Date(r.event.dateTime).toLocaleString("ru-RU", {
        timeZone: "Europe/Moscow",
      }),
      r.phone,
      r.email,
      r.marketingConsent ? "Да" : "Нет",
      r.status,
    ].join(";")
  );

  const csv = "\uFEFF" + [header, ...rows].join("\r\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="registrations-${Date.now()}.csv"`,
    },
  });
}
