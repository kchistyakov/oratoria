import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Оратория — клуб публичных выступлений",
  description:
    "Оратория — клуб для тех, кто хочет научиться говорить уверенно и убедительно. Присоединяйтесь к нашим мероприятиям.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
