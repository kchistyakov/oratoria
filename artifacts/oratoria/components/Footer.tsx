import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#1a3a5c] text-white mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/70">
            © {year} Оратория. Все права защищены.
          </p>
          <nav className="flex gap-6 text-sm text-white/70">
            <Link href="/legal/privacy" className="hover:text-[#c8a96e] transition-colors">
              Политика конфиденциальности
            </Link>
            <Link href="/legal/terms" className="hover:text-[#c8a96e] transition-colors">
              Условия использования
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
