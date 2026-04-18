import NewsletterForm from "@/components/NewsletterForm";

export default function NewsletterSection() {
  return (
    <section id="newsletter" className="py-16 px-4 bg-[#2d6a4f] text-white">
      <div className="max-w-lg mx-auto text-center">
        <h2
          className="text-2xl md:text-3xl font-bold mb-3"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Следите за событиями
        </h2>
        <p className="text-white/70 leading-relaxed">
          Анонсы мероприятий — без спама и мотивационных цитат.
        </p>
        <NewsletterForm />
      </div>
    </section>
  );
}
