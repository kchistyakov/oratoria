import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1c1c1c] text-white">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div>
            <p
              className="text-xl font-bold text-[#74c69d] mb-2"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Оратория
            </p>
            <p className="text-sm text-white/60 leading-relaxed">
              Клуб публичных выступлений
              <br />
              в Санкт-Петербурге
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-white/50 mb-3 uppercase tracking-widest">
              Контакты
            </p>
            <ul className="space-y-2 text-sm text-white/60">
              <li>Санкт-Петербург</li>
              <li>
                <a
                  href="tel:+79941021321"
                  className="hover:text-[#74c69d] transition-colors"
                >
                  +7 994 102-13-21
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/@mashaclubspb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#74c69d] transition-colors"
                >
                  Telegram
                </a>
              </li>
              <li className="text-white/30">VK (скоро)</li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold text-white/50 mb-3 uppercase tracking-widest">
              Документы
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/legal/privacy"
                  className="text-white/60 hover:text-[#74c69d] transition-colors"
                >
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/terms"
                  className="text-white/60 hover:text-[#74c69d] transition-colors"
                >
                  Условия участия
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-sm text-white/30">
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} Оратория. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
