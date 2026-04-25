import type { Event } from "@prisma/client";
import { formatEventDate, formatEventTime, formatPrice } from "@/lib/format";

type ContentMap = Record<string, string>;

interface Props {
  content: ContentMap;
  nextEvent: Event | null;
}

export default function HeroSection({ content, nextEvent }: Props) {
  const title =
    content.hero_title ?? "Клуб, где боятся все — и говорят всё равно";
  const subtitle =
    content.hero_subtitle ??
    "Оратория — место, где публичные выступления перестают быть страшными. Приходи. Скажешь что-нибудь вслух — уже молодец.";
  const slogan =
    content.slogan ?? "Клуб публичных выступлений · Санкт-Петербург";
  const heroImageUrl = content.hero_image_url?.trim() ?? "";

  return (
    <section className="bg-[#f8f4ee] py-20 md:py-28 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs font-medium text-[#40916c] tracking-widest uppercase mb-6">
          {slogan}
        </p>

        <h1
          className="text-4xl md:text-5xl font-bold text-[#1c1c1c] leading-tight mb-6"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {title}
        </h1>

        <p className="text-lg text-[#4a4a4a] mb-10 max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="#events"
            className="bg-[#2d6a4f] text-white px-8 py-3 rounded-full font-medium hover:bg-[#40916c] transition-colors"
          >
            Ближайшие встречи
          </a>
          <a
            href="#about"
            className="border border-[#2d6a4f] text-[#2d6a4f] px-8 py-3 rounded-full font-medium hover:bg-[#d8f3dc] transition-colors"
          >
            О клубе
          </a>
        </div>

        {heroImageUrl && (
          <div className="mt-10 mx-auto max-w-lg rounded-2xl overflow-hidden shadow-sm border border-[#e9dcc9]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroImageUrl}
              alt="Оратория"
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {nextEvent && (
          <div className="mt-10 inline-block text-left bg-white rounded-2xl px-6 py-5 shadow-sm border border-[#e9dcc9] max-w-sm">
            <p className="text-xs font-medium text-[#40916c] uppercase tracking-widest mb-2">
              Ближайшая встреча
            </p>
            <p className="font-semibold text-[#1c1c1c] mb-1 leading-snug">
              {nextEvent.title}
            </p>
            <p className="text-sm text-[#6b6b6b]">
              {formatEventDate(nextEvent.dateTime)},{" "}
              {formatEventTime(nextEvent.dateTime)}
            </p>
            <p className="text-sm text-[#6b6b6b] mb-3">{nextEvent.place}</p>
            <span className="inline-block text-sm font-medium text-[#2d6a4f] bg-[#d8f3dc] px-3 py-1 rounded-full">
              {formatPrice(nextEvent.price)}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
