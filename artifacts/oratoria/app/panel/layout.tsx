import Link from "next/link";
import { cookies } from "next/headers";
import { COOKIE_NAME, verifySession } from "@/lib/admin-auth";
import { logoutAction } from "./actions";

const navLinks = [
  { href: "/panel", label: "Дашборд" },
  { href: "/panel/events", label: "Мероприятия" },
  { href: "/panel/registrations", label: "Регистрации" },
  { href: "/panel/content", label: "Тексты сайта" },
  { href: "/panel/faq", label: "FAQ" },
  { href: "/panel/subscribers", label: "Подписчики" },
];

function Sidebar() {
  return (
    <aside className="w-56 min-h-screen bg-[#1c1c1c] flex flex-col shrink-0">
      <div className="px-5 py-6 border-b border-white/10">
        <span className="text-white font-bold text-lg tracking-tight">
          Оратория
        </span>
        <span className="block text-[#aaa] text-xs mt-0.5">
          Панель управления
        </span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center px-3 py-2.5 rounded-lg text-sm text-[#ccc] hover:bg-white/10 hover:text-white transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-white/10">
        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-[#ccc] hover:bg-white/10 hover:text-white transition-colors"
          >
            Выйти
          </button>
        </form>
      </div>
    </aside>
  );
}

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value ?? "";
  const isLoggedIn = await verifySession(token);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        {children}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
