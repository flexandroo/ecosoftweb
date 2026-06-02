import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
    <html lang="uk">
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
