import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#1a3a5c] text-white">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-wide text-[#c8a96e]">
          Оратория
        </Link>
        <nav className="flex gap-6 text-sm">
          <Link href="/" className="hover:text-[#c8a96e] transition-colors">
            Главная
          </Link>
          <Link href="/#events" className="hover:text-[#c8a96e] transition-colors">
            Мероприятия
          </Link>
          <Link href="/#faq" className="hover:text-[#c8a96e] transition-colors">
            FAQ
          </Link>
        </nav>
      </div>
    </header>
  );
}
