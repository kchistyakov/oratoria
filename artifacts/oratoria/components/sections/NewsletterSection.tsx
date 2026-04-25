import NewsletterForm from "@/components/NewsletterForm";

interface Props {
  title?: string;
  body?: string;
}

export default function NewsletterSection({ title, body }: Props) {
  return (
    <section id="newsletter" className="py-16 px-4 bg-[#2d6a4f] text-white">
      <div className="max-w-lg mx-auto text-center">
        <h2
          className="text-2xl md:text-3xl font-bold mb-3"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {title ?? "Узнавайте первыми"}
        </h2>
        {body && (
          <p className="text-white/70 leading-relaxed">{body}</p>
        )}
        {!body && (
          <p className="text-white/70 leading-relaxed">
            Анонсы встреч — без спама и мотивационных цитат.
          </p>
        )}
        <NewsletterForm />
      </div>
    </section>
  );
}
