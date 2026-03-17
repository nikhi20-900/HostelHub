"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Wifi,
  UtensilsCrossed,
  Shirt,
  ShieldCheck,
  BookOpen,
  Flame,
  MapPin,
  Phone,
  Mail,
  Star,
  BedDouble,
  IndianRupee,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Section, SectionHeader } from "@/components/shared/section";
import { PageTransition } from "@/components/shared/page-transition";
import { rooms, facilities, galleryImages } from "@/lib/mock-data";

// Icon mapping for facilities
const iconMap: Record<string, React.ReactNode> = {
  wifi: <Wifi className="h-6 w-6" />,
  utensils: <UtensilsCrossed className="h-6 w-6" />,
  shirt: <Shirt className="h-6 w-6" />,
  "shield-check": <ShieldCheck className="h-6 w-6" />,
  "book-open": <BookOpen className="h-6 w-6" />,
  flame: <Flame className="h-6 w-6" />,
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function HomePage() {
  const previewRooms = rooms.filter((r) => r.is_available).slice(0, 3);
  const previewGallery = galleryImages.slice(0, 6);

  return (
    <PageTransition>
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 25px 25px, white 1px, transparent 0)",
            backgroundSize: "50px 50px",
          }} />
        </div>
        {/* Amber glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/20 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6 bg-amber-500/20 text-amber-300 border-amber-500/30 px-4 py-1.5 text-sm">
                <Star className="mr-1.5 h-3.5 w-3.5" /> Premium Student Accommodation
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight"
            >
              Your Home
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Away From Home
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-2xl text-lg text-zinc-300 leading-relaxed"
            >
              Experience comfortable, secure, and affordable hostel living designed
              for students. Modern amenities, vibrant community, and the perfect
              environment for academic success.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <Link href="/rooms">
                <Button
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-white rounded-full px-8 text-base h-12"
                >
                  Explore Rooms <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 text-base h-12 border-zinc-600 text-zinc-200 hover:bg-zinc-800"
                >
                  Contact Us
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8"
            >
              {[
                { value: "50+", label: "Rooms" },
                { value: "200+", label: "Students" },
                { value: "4.8", label: "Rating" },
                { value: "24/7", label: "Security" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-amber-400">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-zinc-400">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <Section id="about" className="bg-background">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            custom={0}
          >
            <Badge className="mb-4 bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">
              About Us
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              A Place Where Students{" "}
              <span className="text-amber-500">Thrive</span>
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              HostelHub has been providing premium student accommodation for over
              a decade. Our mission is to create a comfortable, safe, and vibrant
              living environment that supports academic excellence and personal
              growth.
            </p>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Located just steps from the university campus, our hostel offers a
              perfect blend of convenience, comfort, and community. Whether
              you&apos;re a first-year student or a post-graduate, we have the
              ideal room for you.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {[
                { label: "Years of Service", value: "10+" },
                { label: "Happy Students", value: "2000+" },
                { label: "Rooms Available", value: "50+" },
                { label: "Staff Members", value: "30+" },
              ].map((item) => (
                <div key={item.label} className="text-center p-3 rounded-xl bg-muted">
                  <p className="text-xl font-bold text-amber-500">{item.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            custom={2}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80"
                alt="HostelHub building"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-card border shadow-lg rounded-2xl p-4 hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-white">
                  <Star className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Rated 4.8/5</p>
                  <p className="text-xs text-muted-foreground">by 500+ students</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ===== FACILITIES SECTION ===== */}
      <Section className="bg-muted/50">
        <SectionHeader
          title="Our Facilities"
          subtitle="Everything you need for a comfortable and productive stay"
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {facilities.map((facility, i) => (
            <motion.div key={facility.name} variants={fadeInUp} custom={i}>
              <Card className="group border bg-card hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors flex-shrink-0">
                    {iconMap[facility.icon]}
                  </div>
                  <div>
                    <h3 className="font-semibold">{facility.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {facility.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ===== ROOM PREVIEW SECTION ===== */}
      <Section>
        <SectionHeader
          title="Featured Rooms"
          subtitle="Discover our most popular room options"
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {previewRooms.map((room, i) => (
            <motion.div key={room.id} variants={fadeInUp} custom={i}>
              <Link href={`/rooms/${room.id}`}>
                <Card className="group overflow-hidden border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={room.images[0]}
                      alt={room.room_name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <Badge className="absolute top-3 left-3 bg-amber-500 text-white border-0">
                      {room.room_type}
                    </Badge>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-lg">{room.room_name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {room.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <IndianRupee className="h-4 w-4" />
                        <span>{room.price.toLocaleString()}</span>
                        <span className="text-xs font-normal text-muted-foreground">
                          /month
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <BedDouble className="h-4 w-4" />
                        <span>{room.beds_available} bed{room.beds_available !== 1 ? "s" : ""} left</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-10 text-center">
          <Link href="/rooms">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8"
            >
              View All Rooms <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Section>

      {/* ===== GALLERY PREVIEW SECTION ===== */}
      <Section className="bg-muted/50">
        <SectionHeader
          title="Life at HostelHub"
          subtitle="Take a peek into our vibrant hostel community"
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {previewGallery.map((img, i) => (
            <motion.div
              key={img.id}
              variants={fadeInUp}
              custom={i}
              className={`relative overflow-hidden rounded-2xl ${
                i === 0 ? "md:row-span-2 md:col-span-1" : ""
              }`}
            >
              <div className={`relative ${i === 0 ? "aspect-[3/4]" : "aspect-square"} group`}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-10 text-center">
          <Link href="/gallery">
            <Button variant="outline" size="lg" className="rounded-full px-8">
              View Full Gallery <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Section>

      {/* ===== CONTACT SECTION ===== */}
      <Section>
        <SectionHeader
          title="Get In Touch"
          subtitle="Have questions? We'd love to hear from you"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <MapPin className="h-6 w-6" />,
              title: "Visit Us",
              detail: "123 University Road, Near Campus Gate, City - 400001",
            },
            {
              icon: <Phone className="h-6 w-6" />,
              title: "Call Us",
              detail: "+91 98765 43210",
            },
            {
              icon: <Mail className="h-6 w-6" />,
              title: "Email Us",
              detail: "info@hostelhub.com",
            },
          ].map((item) => (
            <Card
              key={item.title}
              className="text-center p-6 border hover:shadow-md transition-all hover:-translate-y-1"
            >
              <CardContent className="flex flex-col items-center gap-3 p-0">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
                  {item.icon}
                </div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/contact">
            <Button className="bg-amber-500 hover:bg-amber-600 text-white rounded-full px-8">
              Contact Us <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Section>

      {/* ===== MAP SECTION ===== */}
      <section className="w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.0!2d72.8!3d19.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA2JzAwLjAiTiA3MsKwNDgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full"
          title="HostelHub Location"
        />
      </section>
    </PageTransition>
  );
}
