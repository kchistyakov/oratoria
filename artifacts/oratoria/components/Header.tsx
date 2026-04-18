import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-[#e9dcc9] sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-[#2d6a4f]"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Оратория
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-[#4a4a4a]">
          <Link href="#events" className="hover:text-[#2d6a4f] transition-colors">
            Мероприятия
          </Link>
          <Link href="#about" className="hover:text-[#2d6a4f] transition-colors">
            О клубе
          </Link>
          <Link href="#faq" className="hover:text-[#2d6a4f] transition-colors">
            FAQ
          </Link>
        </nav>

        <a
          href="#events"
          className="text-sm bg-[#2d6a4f] text-white px-5 py-2 rounded-full hover:bg-[#40916c] transition-colors"
        >
          Записаться
        </a>
      </div>
    </header>
  );
}
