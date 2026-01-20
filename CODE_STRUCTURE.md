# Briataor Code Structure Reference

This document outlines the architectural standards and directory structure for the Briataor project. All future modifications and new features must adhere to these guidelines to maintain codebase consistency.

## 📂 Directory Structure

### 1. `app/` (Next.js App Router)

- Contains the core routing and layout logic.
- `layout.tsx`: Root layout with global providers (Lenis, Fonts).
- `(MainLayout)/`: Route group for the main site layout.
  - `layout.tsx`: Standard page wrapper with `Navbar` and `Footer`.
  - `page.tsx`: The home page assembly point.

### 2. `pages/` (Feature Sections)

- **Crucial**: This directory is used for page-specific component sections, organized by domain.
- Example: `pages/home/` contains all sections for the Home page (Banner, MeetArtist, etc.).
- Each section should be in its own subdirectory with a `.tsx` file.

### 3. `shared/` (Layout Components)

- Shared UI elements that appear across most pages.
- `navbar/`: Navigation logic and responsiveness.
- `footer/`: Site-wide footer with branding and links.

### 4. `components/` (Generic & UI Components)

- `ui/`: Atom-level components (buttons, inputs) often from Shadcn/ui.
- `svg/`: Custom SVG icon components.
- `mainLayout/`: Components specific to the main layout structure.

### 5. `assets/` (Local Media)

- Direct imports for images, videos, and fonts used within components.
- Organized by type or feature if needed.

### 6. `lib/` (Utilities)

- Helper functions, class merger utilities (`utils.ts`), and configuration constants.

---

## 🛠 Coding Standards

### 1. Component Architecture

- Use **Client Components** (`"use client"`) only when necessary for hooks or interactivity.
- Prefer **Tailwind CSS** for all styling. Use the `!` prefix (e.g., `w-[200px]!`) or suffix (Tailwind v4) only when overriding library styles like Swiper.
- Keep components focused. Large sections should be broken into sub-components.

### 2. Styling & UI

- **Typography**:
  - Headings: `font-serif` (Cormorant Garamond).
  - Body: `font-lato`.
- **Animations**: Use `framer-motion` for reveal effects and `swiper` for galleries.
- **Responsiveness**: Always use mobile-first breakpoints (`sm:`, `md:`, `lg:`, `xl:`).

### 3. State Management

- Use `useRef` for DOM interactions (like Swiper navigation).
- Keep local state within the closest common ancestor.

### 4. Images

- Always use `next/image` with proper `alt` tags and `fill` or defined `width`/`height` for optimization.

---

## 🚀 How to Add a New Section

1. Create a folder in `pages/[page-name]/[section-name]`.
2. Implement the component with local styles or Tailwind.
3. Import and render it in the corresponding `app/(MainLayout)/page.tsx` or respective route.
4. Update imports in `CODE_STRUCTURE.md` if significant new directories are added.
