Project: HostelHub — A Full-Stack Hostel Management & Booking Platform
Role: Act as a senior full-stack engineer building a production-ready web application.

🛠 Tech Stack (Non-negotiable)

Framework: Next.js 14 with App Router and React Server Components
Language: TypeScript (strict mode) throughout
Styling: Tailwind CSS + shadcn/ui component library
Animations: Framer Motion for page transitions and micro-interactions
Backend/DB: Supabase (PostgreSQL + Auth + Storage)
Forms: React Hook Form + Zod validation
Deployment: Vercel-ready (environment variables via .env.local)


📁 Folder Architecture
/app
  /(public)         → homepage, rooms, gallery, contact
  /(admin)          → protected admin routes
  /api              → Next.js Route Handlers
/components
  /ui               → shadcn primitives
  /shared           → Navbar, Footer, RoomCard, etc.
  /admin            → AdminSidebar, BookingTable, etc.
/lib
  /supabase.ts      → client + server Supabase instances
  /types.ts         → all TypeScript interfaces
  /validations.ts   → Zod schemas
/hooks              → custom React hooks
/public/images      → static assets

🗃 Database Schema (Supabase PostgreSQL)
sql-- rooms table
create table rooms (
  id uuid primary key default gen_random_uuid(),
  room_name text not null,
  room_type text check (room_type in ('Single', 'Double', 'Dormitory', 'Deluxe')),
  price numeric(10,2) not null,
  beds_total integer not null,
  beds_available integer not null,
  description text,
  images text[] default '{}',   -- array of Supabase Storage public URLs
  is_available boolean default true,
  created_at timestamptz default now()
);

-- bookings table
create table bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null,
  room_id uuid references rooms(id) on delete set null,
  move_in_date date not null,
  message text,
  status text check (status in ('pending','accepted','rejected')) default 'pending',
  created_at timestamptz default now()
);

-- RLS Policies
-- Public can INSERT into bookings, SELECT rooms
-- Only authenticated admin can SELECT/UPDATE all bookings, manage rooms

🔐 Auth & Security

Admin login via Supabase Email/Password Auth
Admin route group /(admin) protected by middleware (middleware.ts) checking Supabase session
RLS enabled on all tables; public users can only read rooms and insert bookings
Never expose service role key on client


🌐 Public Pages
Homepage (/): Hero with hostel name + tagline + CTA button → Rooms page. About section. Facilities grid (WiFi, meals, laundry, security, study room — each with icon). Room preview (3 cards). Gallery preview (6 images). Contact section. Embedded Google Map.
Rooms (/rooms): Fetch all is_available = true rooms from DB. Display RoomCard grid: image, type badge, price, beds available, description snippet, "View Details" link. Add filter tabs by room type.
Room Detail (/rooms/[id]): Image carousel (Embla or shadcn). Full description. Price. Facilities list. Beds available indicator. Sticky "Book This Room" CTA → opens booking form modal.
Booking Form (Modal + /booking page fallback): Fields: name, phone, email, room (pre-selected if from room page), move-in date, message. Zod validation. On submit → POST /api/bookings. Show success toast. Decrement beds_available in rooms table.
Gallery (/gallery): Masonry grid. Images fetched from rooms.images + a dedicated gallery Supabase Storage bucket.
Contact (/contact): Contact form (name, email, message) → stores in a messages table. WhatsApp floating button linking to https://wa.me/{PHONE}. Embedded map.

🔒 Admin Pages (all under /admin, protected)
Login (/admin/login): Supabase Auth sign-in form.
Dashboard (/admin/dashboard): Stats cards: total rooms, pending bookings, accepted bookings, occupied beds. Recent bookings table preview.
Bookings (/admin/bookings): Full table with columns: name, room, move-in date, status badge, actions. Accept/Reject buttons call PATCH /api/bookings/[id]. Filter by status. Pagination.
Rooms (/admin/rooms): Table of all rooms. Add/Edit room via modal form. Toggle is_available. Upload images to Supabase Storage, save public URLs to rooms.images array. Delete room with confirmation dialog.

🎨 Design System

Font: Geist Sans (Next.js default) or Inter
Colors: Neutral base (zinc-50/900), warm accent (amber-500), success (green-500), danger (red-500)
Radius: rounded-2xl for cards, rounded-full for pills/badges
Shadows: shadow-sm to shadow-md — no harsh shadows
Motion: Fade-in on page load, hover lift on cards (hover:-translate-y-1 transition-all)
Dark mode: Support via Tailwind dark: classes, toggled by system preference
Mobile-first: All layouts use responsive grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)