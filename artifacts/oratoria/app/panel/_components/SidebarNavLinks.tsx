"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/panel", label: "Дашборд", exact: true },
  { href: "/panel/events", label: "Мероприятия" },
  { href: "/panel/registrations", label: "Регистрации" },
  { href: "/panel/content", label: "Тексты сайта" },
  { href: "/panel/benefits", label: "Преимущества" },
  { href: "/panel/testimonials", label: "Отзывы" },
  { href: "/panel/faq", label: "FAQ" },
  { href: "/panel/subscribers", label: "Подписчики" },
];

export default function SidebarNavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 px-3 py-4 space-y-0.5">
      {navLinks.map((link) => {
        const isActive = link.exact
          ? pathname === link.href
          : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center px-3 py-2.5 rounded-lg text-sm transition-colors ${
              isActive
                ? "bg-white/15 text-white font-medium"
                : "text-[#ccc] hover:bg-white/10 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
