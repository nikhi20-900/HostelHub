"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Section, SectionHeader } from "@/components/shared/section";
import { PageTransition } from "@/components/shared/page-transition";
import { RoomCard } from "@/components/shared/room-card";
import { rooms } from "@/lib/mock-data";
import { RoomType } from "@/lib/types";

const ROOM_TYPES: { label: string; value: "All" | RoomType }[] = [
  { label: "All Rooms", value: "All" },
  { label: "Single", value: "Single" },
  { label: "Double", value: "Double" },
  { label: "Dormitory", value: "Dormitory" },
  { label: "Deluxe", value: "Deluxe" },
];

export default function RoomsPage() {
  const [activeTab, setActiveTab] = useState<"All" | RoomType>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRooms = rooms.filter((room) => {
    // Filter by type
    if (activeTab !== "All" && room.room_type !== activeTab) return false;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        room.room_name.toLowerCase().includes(query) ||
        room.description.toLowerCase().includes(query) ||
        room.facilities.some((f) => f.toLowerCase().includes(query))
      );
    }
    
    return true;
  });

  return (
    <PageTransition>
      {/* Header Area */}
      <div className="bg-muted/30 pt-12 pb-8 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Find Your Perfect Space"
            subtitle="Browse our selection of comfortable, secure, and affordable rooms designed specifically for student living."
            className="mb-8"
          />

          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search rooms, facilities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-background w-full rounded-full"
              />
            </div>

            <Tabs
              defaultValue="All"
              value={activeTab}
              onValueChange={(v) => setActiveTab(v as any)}
              className="w-full sm:w-auto overflow-x-auto overflow-y-hidden"
            >
              <TabsList className="h-10 bg-background border p-1 rounded-full w-max mx-auto sm:mx-0">
                {ROOM_TYPES.map((type) => (
                  <TabsTrigger
                    key={type.value}
                    value={type.value}
                    className="rounded-full px-4 data-[state=active]:bg-amber-500 data-[state=active]:text-white transition-colors"
                  >
                    {type.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      <Section>
        {filteredRooms.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredRooms.map((room) => (
              <motion.div
                key={room.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
              >
                <RoomCard room={room} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="py-20 text-center">
            <h3 className="text-xl font-semibold mb-2">No rooms found</h3>
            <p className="text-muted-foreground">
              We couldn&apos;t find any rooms matching your current filters.
              <br />Try adjusting your search or selecting a different room type.
            </p>
          </div>
        )}
      </Section>
    </PageTransition>
  );
}
