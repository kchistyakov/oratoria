import { prisma } from "@/lib/prisma";
import type { Benefit, Event, FaqItem, Testimonial } from "@prisma/client";
import HeroSection from "@/components/sections/HeroSection";
import EventsSection from "@/components/sections/EventsSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import AboutSection from "@/components/sections/AboutSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FaqSection from "@/components/sections/FaqSection";
import NewsletterSection from "@/components/sections/NewsletterSection";

type ContentMap = Record<string, string>;

const FALLBACK_CONTENT: ContentMap = {
  hero_title: "Клуб, где боятся все — и говорят всё равно",
  hero_subtitle:
    "Оратория — место, где публичные выступления перестают быть страшными. Приходи. Скажешь что-нибудь вслух — уже молодец.",
  slogan: "Тренируй речь. Говори уверенно.",
  about_title: "Что такое Оратория",
  about_body:
    "Оратория — клуб публичных выступлений в Санкт-Петербурге. Мы собираемся раз в две недели: говорим вслух, слушаем друг друга, разбираем выступления. Без мотивационных речей и бизнес-тренеров в пиджаках.",
  for_whom_title: "Для кого?",
  for_whom_body:
    "Для тех, кто замирает, когда нужно высказаться на совещании. Для тех, кто хочет защитить диплом без дрожащего голоса. Для тех, кто просто хочет объясняться яснее — с коллегами, друзьями или начальником.",
};

async function getPageData(): Promise<{
  events: Event[];
  faqItems: FaqItem[];
  benefits: Benefit[];
  testimonials: Testimonial[];
  content: ContentMap;
}> {
  try {
    const [events, faqItems, benefits, testimonials, contentRows] =
      await Promise.all([
        prisma.event.findMany({
          where: { isPublished: true, dateTime: { gte: new Date() } },
          orderBy: { dateTime: "asc" },
          take: 4,
        }),
        prisma.faqItem.findMany({
          where: { isPublished: true },
          orderBy: { sortOrder: "asc" },
        }),
        prisma.benefit.findMany({
          where: { isPublished: true },
          orderBy: { sortOrder: "asc" },
        }),
        prisma.testimonial.findMany({
          where: { isPublished: true },
          orderBy: { sortOrder: "asc" },
        }),
        prisma.siteContent.findMany(),
      ]);

    const content: ContentMap = { ...FALLBACK_CONTENT };
    for (const row of contentRows) {
      content[row.key] = row.body;
    }

    return { events, faqItems, benefits, testimonials, content };
  } catch {
    return {
      events: [],
      faqItems: [],
      benefits: [],
      testimonials: [],
      content: FALLBACK_CONTENT,
    };
  }
}

export default async function HomePage() {
  const { events, faqItems, benefits, testimonials, content } =
    await getPageData();
  const nextEvent = events[0] ?? null;

  return (
    <>
      <HeroSection content={content} nextEvent={nextEvent} />
      <EventsSection events={events} />
      <BenefitsSection benefits={benefits} />
      <AboutSection content={content} />
      <TestimonialsSection testimonials={testimonials} />
      <FaqSection items={faqItems} />
      <NewsletterSection />
    </>
  );
}
