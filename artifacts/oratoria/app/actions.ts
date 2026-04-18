"use server";

// Server actions for form submissions across the landing page.
// All actions follow the useActionState signature: (prevState, formData) => Promise<State>

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// ─── Newsletter ───────────────────────────────────────────────────────────────

export type NewsletterState = {
  error: string | null;
  success: boolean;
};

/**
 * Upserts an email into the NewsletterSubscriber table.
 * Idempotent — subscribing with an existing email is silently accepted.
 */
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

// ─── Event Registration (added in v1.0.1) ────────────────────────────────────

/**
 * Shape of the state passed to/from useActionState in EventCard.
 *
 * - fieldErrors: per-field validation messages (shown inline in the form)
 * - duplicate:   true when the same email is already registered for this event
 * - success:     true when the registration was saved successfully
 * - error:       generic server-side error message
 */
export type RegistrationState = {
  error: string | null;
  fieldErrors: {
    phone?: string;
    email?: string;
  };
  success: boolean;
  duplicate: boolean;
};

/**
 * Validates and saves an event registration.
 *
 * Validation rules:
 *   - phone: required, 10–12 digits (strips non-digit characters before counting)
 *   - email: required, basic RFC-ish regex
 *
 * Duplicate detection:
 *   The Registration table has @@unique([email, eventId]).
 *   On Prisma P2002 (unique constraint violation) we return duplicate=true
 *   so the UI can show a friendly message instead of a generic error.
 *
 * Registration status is set to "new" on creation.
 */
export async function registerForEvent(
  _prevState: RegistrationState,
  formData: FormData
): Promise<RegistrationState> {
  const phone = ((formData.get("phone") as string) ?? "").trim();
  const email = ((formData.get("email") as string) ?? "").trim();
  const marketingConsent = formData.get("marketingConsent") === "on";
  const eventId = ((formData.get("eventId") as string) ?? "").trim();

  // ── Field-level validation ──────────────────────────────────────────────────
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

  // ── Guard: eventId must be present ─────────────────────────────────────────
  if (!eventId) {
    return {
      error: "Мероприятие не найдено. Попробуйте обновить страницу.",
      fieldErrors: {},
      success: false,
      duplicate: false,
    };
  }

  // ── Database write ──────────────────────────────────────────────────────────
  try {
    // Verify the event still exists before creating the registration
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
    // P2002 = unique constraint violation → same email already registered for this event
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
