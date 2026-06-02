import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Ecosoft — Системи очищення води",
    template: "%s | Ecosoft",
  },
  description:
    "Інтернет-магазин систем очищення води Ecosoft: зворотний осмос, фільтри-глечики, магістральні фільтри та системи пом'якшення.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className={inter.variable}>
      <body>
        <CartProvider>
          <Header />
          <main className="main">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
