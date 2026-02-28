import Link from "next/link";
import { Instagram, Twitter, Youtube } from "lucide-react";
import { Divider } from "@/components/atoms/Divider";

const footerLinks = {
  Shop: [
    { label: "All Products", href: "/products" },
    { label: "Ceramics", href: "/products?category=ceramics" },
    { label: "Textiles", href: "/products?category=textiles" },
    { label: "Glassware", href: "/products?category=glassware" },
    { label: "Jewelry", href: "/products?category=jewelry" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Makers", href: "/makers" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Press", href: "/press" },
  ],
  Support: [
    { label: "FAQ", href: "/faq" },
    { label: "Shipping & Returns", href: "/shipping" },
    { label: "Care Guides", href: "/care" },
    { label: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-cream)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="font-display font-bold text-2xl tracking-tight mb-4 block">
              Atelier<span className="text-[var(--color-accent)]">.</span>
            </Link>
            <p className="font-body text-sm text-[var(--color-cream)]/60 leading-relaxed max-w-xs mb-6">
              A curated marketplace for handcrafted objects. We work directly with independent
              makers to bring you pieces made with intention.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Youtube, href: "#", label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="p-2 rounded-full border border-[var(--color-cream)]/20 text-[var(--color-cream)]/60 hover:text-[var(--color-cream)] hover:border-[var(--color-cream)]/40 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="font-body font-semibold text-xs uppercase tracking-widest text-[var(--color-cream)]/40 mb-5">
                {section}
              </h3>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-[var(--color-cream)]/70 hover:text-[var(--color-cream)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Divider className="bg-[var(--color-cream)]/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
          <p className="font-body text-xs text-[var(--color-cream)]/40">
            © {new Date().getFullYear()} Atelier. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((label) => (
              <Link
                key={label}
                href="#"
                className="font-body text-xs text-[var(--color-cream)]/40 hover:text-[var(--color-cream)]/70 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
