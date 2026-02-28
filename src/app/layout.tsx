import type { Metadata } from "next";
import "@/styles/globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { MainLayout } from "@/components/templates/MainLayout";

export const metadata: Metadata = {
  title: {
    default: "Atelier — Handcrafted Objects",
    template: "%s | Atelier",
  },
  description:
    "A curated marketplace for handcrafted ceramics, textiles, glassware, jewelry, and woodwork from independent makers.",
  keywords: ["handmade", "ceramics", "artisan", "handcrafted", "shop"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://atelier.shop",
    siteName: "Atelier",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>
          <WishlistProvider>
            <MainLayout>{children}</MainLayout>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
