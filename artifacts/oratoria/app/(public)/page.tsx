import type { Metadata } from "next";
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
  slogan: "Клуб публичных выступлений · Санкт-Петербург",
  hero_image_url: "",
  events_subtitle: "Ближайшие встречи клуба",
  about_title: "Что такое Оратория",
  about_body:
    "Оратория — клуб публичных выступлений в Санкт-Петербурге. Мы собираемся два-три раза в месяц: говорим вслух, слушаем друг друга, разбираем выступления. Без мотивационных речей и бизнес-тренеров в пиджаках.",
  for_whom_title: "Для кого?",
  for_whom_body:
    "Для тех, кто замирает, когда нужно высказаться на совещании. Для тех, кто хочет защитить диплом без дрожащего голоса. Для тех, кто просто хочет объясняться яснее — с коллегами, друзьями или начальником.",
  newsletter_title: "Узнавайте первыми",
  newsletter_body: "Анонсы встреч — без спама и мотивационных цитат.",
  og_image_url: "",
};

async function getContentMap(): Promise<ContentMap> {
  try {
    const rows = await prisma.siteContent.findMany();
    const map: ContentMap = { ...FALLBACK_CONTENT };
    for (const row of rows) {
      map[row.key] = row.body;
    }
    return map;
  } catch {
    return FALLBACK_CONTENT;
  }
}

async function getPageData(): Promise<{
  events: Event[];
  faqItems: FaqItem[];
  benefits: Benefit[];
  testimonials: Testimonial[];
  content: ContentMap;
}> {
  try {
    const [events, faqItems, benefits, testimonials, content] =
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
        getContentMap(),
      ]);

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

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContentMap();
  const ogImage = content.og_image_url?.trim();

  return {
    title: "Оратория — клуб публичных выступлений",
    description:
      "Оратория — клуб для тех, кто хочет говорить уверенно. Регулярные встречи, честная обратная связь, безопасная среда.",
    openGraph: {
      title: "Оратория — клуб публичных выступлений",
      description:
        "Место, где публичные выступления перестают быть страшными.",
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

export default async function HomePage() {
  const { events, faqItems, benefits, testimonials, content } =
    await getPageData();
  const nextEvent = events[0] ?? null;

  return (
    <>
      <HeroSection content={content} nextEvent={nextEvent} />
      <EventsSection events={events} subtitle={content.events_subtitle} />
      <BenefitsSection benefits={benefits} />
      <AboutSection content={content} />
      <TestimonialsSection testimonials={testimonials} />
      <FaqSection items={faqItems} />
      <NewsletterSection
        title={content.newsletter_title}
        body={content.newsletter_body}
      />
    </>
  );
}
