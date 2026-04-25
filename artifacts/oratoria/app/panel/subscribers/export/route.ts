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

  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  const header = ["ID", "Email", "Дата подписки"].join(";");

  const rows = subscribers.map((s) =>
    [
      s.id,
      s.email,
      new Date(s.createdAt).toLocaleString("ru-RU", {
        timeZone: "Europe/Moscow",
      }),
    ].join(";")
  );

  const csv = "\uFEFF" + [header, ...rows].join("\r\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="subscribers-${Date.now()}.csv"`,
    },
  });
}
