import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

// Display typeface for headings — geometric, premium, supports Cyrillic.
const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
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
    <html lang="uk" className={`${inter.variable} ${manrope.variable}`}>
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
