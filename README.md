# Atelier — E-Commerce Store

A modern, production-ready e-commerce storefront built with **Next.js 15**, **TypeScript 5**, and **Tailwind CSS v4**, following **Atomic Design** principles. Modeled after the portfolio architecture — same conventions, same tooling.

## 🔗 Pages

| Route | Description |
|---|---|
| `/` | Homepage — Hero, featured products, categories, newsletter |
| `/products` | Full product listing with filters & sort |
| `/products/[slug]` | Product detail — images, variants, cart, reviews |
| `/checkout` | Multi-step checkout (contact → shipping → payment) |

---

## 🛠 Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| **Next.js** | 15 (App Router) | Framework |
| **React** | 19 | UI library |
| **TypeScript** | 5.7 | Type safety |
| **Tailwind CSS** | v4 | Styling |
| **pnpm** | 10 | Package manager |
| **Node.js** | 20+ | Runtime |
| **lucide-react** | latest | Icons |
| **clsx** | 2.x | Class name utility |

---

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router pages & layout
│   ├── layout.tsx                # Root layout (fonts, providers, MainLayout)
│   ├── page.tsx                  # Homepage
│   ├── not-found.tsx             # 404 page
│   ├── products/
│   │   ├── page.tsx              # /products — full catalog listing
│   │   └── [slug]/page.tsx       # /products/[slug] — product detail
│   └── checkout/
│       └── page.tsx              # Multi-step checkout
│
├── components/                   # Atomic Design component hierarchy
│   ├── atoms/                    # Smallest, stateless building blocks
│   │   ├── Badge.tsx             # Status/tag labels (New, Sale, etc.)
│   │   ├── Button.tsx            # Multi-variant button with icons & loading
│   │   ├── Divider.tsx           # Horizontal / vertical / labeled dividers
│   │   ├── Input.tsx             # Form input with label, error, addons
│   │   ├── Price.tsx             # Price display with sale/discount
│   │   ├── QuantitySelector.tsx  # +/- quantity input
│   │   └── StarRating.tsx        # Partial-fill star rating
│   │
│   ├── molecules/                # Combinations of atoms
│   │   ├── CartItemRow.tsx       # Single cart line item (image + controls)
│   │   ├── CategoryPills.tsx     # Filter pill buttons for categories
│   │   ├── ProductCard.tsx       # Product grid card (image + quick-add)
│   │   ├── ReviewCard.tsx        # Customer review display
│   │   ├── SearchBar.tsx         # Controlled search form
│   │   └── SortSelect.tsx        # Sort dropdown
│   │
│   ├── organisms/                # Complex, context-aware UI sections
│   │   ├── CartDrawer.tsx        # Slide-in cart with item list & totals
│   │   ├── Footer.tsx            # Site-wide footer with nav + social
│   │   ├── Header.tsx            # Sticky header with nav, search, cart
│   │   ├── Hero.tsx              # Homepage hero with stats
│   │   ├── ProductDetail.tsx     # Full product page (images, variants, CTA)
│   │   └── ProductGrid.tsx       # Filterable/sortable product grid
│   │
│   └── templates/
│       └── MainLayout.tsx        # Page shell (Header + Footer + CartDrawer)
│
├── context/
│   ├── CartContext.tsx           # Cart state (add, remove, update, totals)
│   └── WishlistContext.tsx       # Wishlist toggle state
│
├── lib/
│   ├── data.ts                   # Mock product/category/review seed data
│   └── utils.ts                  # formatCurrency, cn, slugify, etc.
│
├── styles/
│   └── globals.css               # Tailwind v4 @theme tokens + base styles
│
└── types/
    └── index.ts                  # All TypeScript types (Product, Cart, Order…)
```

---

## 🚀 Getting Started

### Prerequisites

Node.js 20+ and pnpm installed.

```bash
# Install pnpm if needed
corepack enable pnpm
# or
npm install -g pnpm
```

### Setup

```bash
# Clone
git clone <repo-url>
cd ecommerce

# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Commands

| Command | Action |
|---|---|
| `pnpm dev` | Start dev server at http://localhost:3000 |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | ESLint check |
| `pnpm type-check` | TypeScript type check |

---

## 🎨 Design System

All design tokens are defined as CSS custom properties in `globals.css` via Tailwind v4's `@theme` block:

```css
@theme {
  --font-display: "Playfair Display", serif;
  --font-body: "DM Sans", sans-serif;

  --color-cream: #faf7f2;          /* page background */
  --color-ink: #1a1410;            /* primary text */
  --color-accent: #c8442a;         /* CTAs, sale badges */
  --color-gold: #b8962e;           /* accents, labels */
  /* ... */
}
```

Use them directly in Tailwind utility classes:

```tsx
<div className="bg-cream text-ink border-default shadow-card">
```

---

## 🧩 Atomic Design Conventions

### Atoms
Pure, stateless, presentational. No context dependencies. Props-driven only.

### Molecules
Compose atoms. May have local state. No direct store/context access.

### Organisms
Full UI sections. May use context (`useCart`, `useWishlist`). Self-contained.

### Templates
Page shells. Wire together organisms and inject children.

### Pages (`app/`)
Next.js route handlers. Pass data into templates and organisms.

---

## 🛒 Cart & State

State is managed via React Context + `useReducer`:

- **`CartContext`** — add/remove/update items, calculate subtotal, tax (8%), shipping (free over $150)
- **`WishlistContext`** — toggle wishlist state per product

Both are provided at the root layout level.

---

## 📦 Adding New Products

Edit `src/lib/data.ts` — add entries to the `products` array following the `Product` type from `src/types/index.ts`.

```typescript
{
  id: "prod-9",
  name: "My New Product",
  slug: "my-new-product",
  // ...
}
```

In a real app, replace `data.ts` with API calls (e.g. Shopify Storefront API, Medusa, or a custom backend).

---

## 🔌 Extending

| Feature | Approach |
|---|---|
| Real product API | Replace `src/lib/data.ts` imports with `fetch` calls in page components |
| Auth | Add `next-auth` + user context |
| Payments | Integrate Stripe — the checkout form is already wired up for this |
| CMS | Connect Contentful, Sanity, or similar for product content |
| Search | Replace client-side filter with Algolia or Typesense |
| Storybook | Add `@storybook/nextjs` and write stories for each atom/molecule |