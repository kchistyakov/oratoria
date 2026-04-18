"use server";

import { prisma } from "@/lib/prisma";

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
