"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionHeader } from "@/components/shared/section";
import { PageTransition } from "@/components/shared/page-transition";
import { galleryImages } from "@/lib/mock-data";

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Simple columns assignment for pseudo-masonry layout
  // In a real app we'd use a masonry library, but css columns works well enough
  // for a neat gallery presentation without extra dependencies.

  return (
    <PageTransition>
      <div className="bg-muted/30 pt-12 pb-8 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Hostel Gallery"
            subtitle="Take a visual tour of our facilities, rooms, and vibrant community life at HostelHub."
            className="mb-0"
          />
        </div>
      </div>

      <Section>
        {/* CSS Columns Masonry */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryImages.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: (index % 10) * 0.1 }}
              className="relative break-inside-avoid group cursor-pointer overflow-hidden rounded-xl"
              onClick={() => setSelectedImage(img.src)}
            >
              {/* To make images responsive in columns, we don't use absolute fill unless we have a specific aspect ratio container.
                  Here we use standard image tag with Next.js optimization for natural aspect ratios. */}
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={800} // Approximate max height for natural scaling
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <ZoomIn className="h-8 w-8 text-white drop-shadow-md" />
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Lightbox / Modal for Image Viewing */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 sm:right-8 sm:top-8 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors z-[60]"
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close picker</span>
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full h-full max-w-6xl max-h-[85vh] rounded-lg overflow-hidden flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Enlarged gallery view"
                fill
                className="object-contain"
                sizes="100vw"
                quality={100}
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
