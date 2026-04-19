"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { COOKIE_NAME, computeToken, verifySession } from "@/lib/admin-auth";

async function requireAdmin() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value ?? "";
  const ok = await verifySession(token);
  if (!ok) redirect("/panel/login");
}

export async function loginAction(
  _prev: { error: string } | null,
  formData: FormData
): Promise<{ error: string }> {
  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const password = (formData.get("password") as string | null) ?? "";

  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return { error: "Неверный email или пароль" };
  }

  const token = await computeToken();
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  redirect("/panel");
}

export async function logoutAction() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
  redirect("/panel/login");
}

export async function createEventAction(
  _prev: unknown,
  formData: FormData
): Promise<{ error?: string }> {
  await requireAdmin();

  const title = (formData.get("title") as string | null)?.trim() ?? "";
  const description =
    (formData.get("description") as string | null)?.trim() ?? "";
  const dateTimeRaw = (formData.get("dateTime") as string | null) ?? "";
  const place = (formData.get("place") as string | null)?.trim() ?? "";
  const priceRaw = formData.get("price") as string | null;
  const isPublished = formData.get("isPublished") === "on";

  if (!title || !description || !dateTimeRaw || !place) {
    return { error: "Заполните все обязательные поля" };
  }

  // datetime-local gives "YYYY-MM-DDTHH:MM"; treat it as Moscow time (UTC+3).
  const dt = dateTimeRaw.slice(0, 16);
  const dateTime = new Date(dt + ":00+03:00");
  if (isNaN(dateTime.getTime())) {
    return { error: "Некорректная дата" };
  }

  const price = Math.max(0, parseInt(priceRaw ?? "0", 10) || 0);

  await prisma.event.create({
    data: { title, description, dateTime, place, price, isPublished },
  });

  revalidatePath("/panel/events");
  revalidatePath("/");
  redirect("/panel/events");
}

export async function updateEventAction(
  _prev: unknown,
  formData: FormData
): Promise<{ error?: string }> {
  await requireAdmin();

  const id = formData.get("id") as string;
  const title = (formData.get("title") as string | null)?.trim() ?? "";
  const description =
    (formData.get("description") as string | null)?.trim() ?? "";
  const dateTimeRaw = (formData.get("dateTime") as string | null) ?? "";
  const place = (formData.get("place") as string | null)?.trim() ?? "";
  const priceRaw = formData.get("price") as string | null;
  const isPublished = formData.get("isPublished") === "on";

  if (!id || !title || !description || !dateTimeRaw || !place) {
    return { error: "Заполните все обязательные поля" };
  }

  // datetime-local gives "YYYY-MM-DDTHH:MM"; treat it as Moscow time (UTC+3).
  const dt = dateTimeRaw.slice(0, 16);
  const dateTime = new Date(dt + ":00+03:00");
  if (isNaN(dateTime.getTime())) {
    return { error: "Некорректная дата" };
  }

  const price = Math.max(0, parseInt(priceRaw ?? "0", 10) || 0);

  await prisma.event.update({
    where: { id },
    data: { title, description, dateTime, place, price, isPublished },
  });

  revalidatePath("/panel/events");
  revalidatePath("/");
  redirect("/panel/events");
}

export async function deleteEventAction(id: string) {
  await requireAdmin();
  // Delete registrations first to satisfy the FK constraint.
  await prisma.registration.deleteMany({ where: { eventId: id } });
  await prisma.event.delete({ where: { id } });
  revalidatePath("/panel/events");
  revalidatePath("/panel/registrations");
  revalidatePath("/");
  redirect("/panel/events");
}

const VALID_STATUSES = ["new", "confirmed", "cancelled", "attended", "no_show"];

export async function updateRegistrationStatusAction(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  const status = formData.get("status") as string;
  // eventId is passed as a hidden field from the per-event detail page so we
  // can revalidate that specific route in addition to the index.
  const eventId = (formData.get("eventId") as string | null)?.trim() ?? "";

  if (!id || !VALID_STATUSES.includes(status)) return;

  await prisma.registration.update({ where: { id }, data: { status } });
  revalidatePath("/panel/registrations");
  // Revalidate the specific event's registrations page if we know which one.
  if (eventId) {
    revalidatePath(`/panel/registrations/${eventId}`);
  }
  // Also revalidate the dashboard so the nearest-event count stays fresh.
  revalidatePath("/panel");
}

export async function updateContentAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const key = (formData.get("key") as string | null)?.trim() ?? "";
  const body = (formData.get("body") as string | null) ?? "";
  const title = (formData.get("title") as string | null)?.trim() ?? "";

  if (!key) return;

  await prisma.siteContent.upsert({
    where: { key },
    update: { body, ...(title ? { title } : {}) },
    create: { key, body, title: title || key },
  });

  revalidatePath("/panel/content");
  revalidatePath("/");
  redirect("/panel/content?saved=1");
}

export async function createFaqAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const question =
    (formData.get("question") as string | null)?.trim() ?? "";
  const answer = (formData.get("answer") as string | null)?.trim() ?? "";
  const sortOrderRaw = formData.get("sortOrder") as string | null;
  const isPublished = formData.get("isPublished") !== null;

  if (!question || !answer) return;

  const sortOrder = sortOrderRaw ? parseInt(sortOrderRaw, 10) : 0;

  await prisma.faqItem.create({
    data: { question, answer, sortOrder, isPublished },
  });

  revalidatePath("/panel/faq");
  revalidatePath("/");
  redirect("/panel/faq");
}

export async function updateFaqAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = formData.get("id") as string;
  const question =
    (formData.get("question") as string | null)?.trim() ?? "";
  const answer = (formData.get("answer") as string | null)?.trim() ?? "";
  const sortOrderRaw = formData.get("sortOrder") as string | null;
  const isPublished = formData.get("isPublished") !== null;

  if (!question || !answer || !id) return;

  const sortOrder = sortOrderRaw ? parseInt(sortOrderRaw, 10) : 0;

  await prisma.faqItem.update({
    where: { id },
    data: { question, answer, sortOrder, isPublished },
  });

  revalidatePath("/panel/faq");
  revalidatePath("/");
  redirect("/panel/faq");
}

export async function deleteFaqAction(id: string) {
  await requireAdmin();
  await prisma.faqItem.delete({ where: { id } });
  revalidatePath("/panel/faq");
  revalidatePath("/");
  redirect("/panel/faq");
}
