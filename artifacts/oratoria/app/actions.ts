"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export type NewsletterState = {
  error: string | null;
  success: boolean;
};

export async function subscribeToNewsletter(
  _prevState: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {
  const email = ((formData.get("email") as string) ?? "").trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Введите корректный адрес электронной почты", success: false };
  }

  try {
    await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: {},
      create: { email },
    });
    return { error: null, success: true };
  } catch {
    return { error: "Что-то пошло не так. Попробуйте позже.", success: false };
  }
}

export type RegistrationState = {
  error: string | null;
  fieldErrors: {
    phone?: string;
    email?: string;
  };
  success: boolean;
  duplicate: boolean;
};

export async function registerForEvent(
  _prevState: RegistrationState,
  formData: FormData
): Promise<RegistrationState> {
  const phone = ((formData.get("phone") as string) ?? "").trim();
  const email = ((formData.get("email") as string) ?? "").trim();
  const marketingConsent = formData.get("marketingConsent") === "on";
  const eventId = ((formData.get("eventId") as string) ?? "").trim();

  const fieldErrors: RegistrationState["fieldErrors"] = {};

  if (!phone) {
    fieldErrors.phone = "Укажите номер телефона";
  } else {
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 12) {
      fieldErrors.phone = "Введите корректный номер (от 10 до 12 цифр)";
    }
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fieldErrors.email = "Введите корректный email";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { error: null, fieldErrors, success: false, duplicate: false };
  }

  if (!eventId) {
    return {
      error: "Мероприятие не найдено. Попробуйте обновить страницу.",
      fieldErrors: {},
      success: false,
      duplicate: false,
    };
  }

  try {
    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) {
      return {
        error: "Мероприятие не найдено. Попробуйте обновить страницу.",
        fieldErrors: {},
        success: false,
        duplicate: false,
      };
    }

    await prisma.registration.create({
      data: {
        phone,
        email,
        marketingConsent,
        eventId,
        status: "new",
      },
    });

    return { error: null, fieldErrors: {}, success: true, duplicate: false };
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2002"
    ) {
      return { error: null, fieldErrors: {}, success: false, duplicate: true };
    }
    console.error("Registration error:", e);
    return {
      error: "Что-то пошло не так. Попробуйте позже.",
      fieldErrors: {},
      success: false,
      duplicate: false,
    };
  }
}
