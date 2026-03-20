Act as a senior product designer + frontend architect building a production-grade UI for a hostel management platform called "HostelHub".

This is NOT a concept design. This must feel like a real SaaS product used daily. Avoid generic AI UI patterns, avoid Dribbble-style overdesign, and avoid unnecessary animations.

---

## 🎯 Core Design Intent

Design a clean, modern, functional UI that prioritizes:
- clarity over decoration
- usability over aesthetics
- structured layout over visual noise

The UI must feel like:
→ a real dashboard + booking system  
→ similar to Airbnb (structure), Notion (clarity), and Stripe (clean density)

---

## 🧱 Layout Principles

- Use consistent spacing scale (8px system)
- Max container width: 1200–1280px
- Use grid-based layouts (no random placement)
- Clear section separation using spacing, NOT borders everywhere
- Avoid excessive shadows, gradients, glassmorphism, or neumorphism

---

## 🎨 Visual System

- Background: neutral (white / zinc-50 / dark zinc-900)
- Primary accent: amber-500 (used sparingly for CTA)
- Text hierarchy:
  - Heading: font-semibold
  - Subheading: text-muted
  - Body: readable, no low contrast
- Border usage: minimal, subtle (border-zinc-200)

NO:
- flashy gradients
- heavy shadows
- colorful overload
- rounded everywhere (use purposefully)

---

## 🧩 Component Philosophy

Every component must look:
- reusable
- structured
- production-ready

Avoid:
- overly padded cards
- floating random elements
- inconsistent button styles

Use:
- clear alignment
- predictable spacing
- consistent component sizes

---

## 📄 Page-wise UI Requirements

### 1. Homepage (/)

Structure:

1. Hero Section
   - Left: Title + short tagline
   - Right: hostel image
   - CTA: “View Rooms”
   - No full-screen hero, keep it contained

2. Facilities Section
   - Grid (2–3 columns)
   - Each item = icon + label
   - No cards, just clean rows

3. Room Preview
   - 3 structured cards
   - Image → title → price → beds → CTA

4. Gallery Preview
   - Tight grid (no gaps overload)
   - Uniform aspect ratio

5. Contact
   - Simple form + map side-by-side

---

### 2. Rooms Page (/rooms)

- Top: filter tabs (Single / Double / Dorm / Deluxe)
- Grid layout:
  - 3 columns desktop
  - 1 column mobile

Room Card must include:
- image (fixed ratio)
- room type badge (top-left)
- price (clear emphasis)
- beds available
- short description (2 lines max)
- CTA button

NO:
- long paragraphs
- cluttered cards

---

### 3. Room Detail Page

Layout split:

LEFT:
- image gallery (carousel style but minimal UI)

RIGHT:
- room name
- price
- availability
- description
- facilities list

Sticky CTA:
→ “Book This Room”

Booking should open modal (not navigate away immediately)

---

### 4. Booking Form (Modal)

- Compact form
- Clear labels
- No unnecessary fields

Fields:
- name
- phone
- email
- room (dropdown or prefilled)
- move-in date
- message

Design:
- single column
- strong CTA button
- inline validation errors

---

### 5. Admin Dashboard (/admin)

Style:
- functional, dense, professional

Layout:
- Sidebar (fixed, minimal icons + labels)
- Main content area

Top Stats Cards:
- total rooms
- pending bookings
- accepted bookings
- occupied beds

Cards must be:
- compact
- aligned
- no oversized padding

---

### 6. Admin Tables (Bookings & Rooms)

Table Design:
- clear column alignment
- compact row height
- subtle hover highlight

Columns:
- name
- room
- date
- status
- actions

Status badges:
- pending → neutral
- accepted → green
- rejected → red

Actions:
- small buttons (not big CTA)

---

## 📱 Responsiveness

- Mobile-first
- Collapse grids cleanly
- Sidebar becomes drawer in admin
- No horizontal scrolling

---

## 🚫 Strict Constraints

DO NOT:
- add storytelling UI
- add illustrations or decorative images
- use animation-heavy transitions
- create overly futuristic UI
- use inconsistent spacing
- make it look like a template

---

## ✅ Output Requirements

Generate:
- clean React + Tailwind structure
- reusable components
- realistic spacing + layout
- production-level UI hierarchy

Focus on:
→ structure  
→ usability  
→ clarity  

NOT:
→ visual gimmicks  
→ design trends  

---

## 🧠 Mental Model

Think like:
“I’m designing a product that hostel owners will use every day — fast, clear, no confusion.”

Not:
“I’m designing something to impress on Dribbble.”