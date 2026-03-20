import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  BedDouble,
  CheckCircle2,
  IndianRupee,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Section } from "@/components/shared/section";
import { PageTransition } from "@/components/shared/page-transition";
import { BookingModal } from "@/components/shared/booking-modal";
import { ImageCarousel } from "@/components/shared/image-carousel";
import { rooms } from "@/lib/mock-data";

interface RoomPageProps {
  params: {
    id: string;
  };
}

// In Next.js 14, params might need to be awaited in some setups, but since we're using
// a simple mock setup, we can access it directly. For production static generation:
export function generateStaticParams() {
  return rooms.map((room) => ({
    id: room.id,
  }));
}

export default function RoomDetailPage({ params }: RoomPageProps) {
  const room = rooms.find((r) => r.id === params.id);

  if (!room) {
    notFound();
  }

  return (
    <PageTransition>
      <div className="bg-muted/30 py-6 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/rooms"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-amber-500 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all rooms
          </Link>
        </div>
      </div>

      <Section className="!pt-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
          {/* Left Column - Images & Details */}
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-amber-500 text-white border-0 text-sm px-3 py-1">
                  {room.room_type}
                </Badge>
                {!room.is_available && (
                  <Badge variant="destructive" className="text-sm px-3 py-1">
                    Sold Out
                  </Badge>
                )}
                {room.is_available && room.beds_available <= 2 && (
                  <Badge className="bg-red-500 text-white border-0 text-sm px-3 py-1">
                    Only {room.beds_available} left
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {room.room_name}
              </h1>
            </div>

            <ImageCarousel images={room.images} altPrefix={room.room_name} />

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-3">About this room</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {room.description}
                </p>
              </div>

              <Separator />

              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-amber-500" />
                  Room Facilities
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4">
                  {room.facilities.map((facility) => (
                    <div key={facility} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span className="text-muted-foreground">{facility}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:w-[400px] shrink-0">
            <div className="sticky top-24">
              <Card className="border shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Monthly Rent
                    </span>
                    <div className="flex items-baseline gap-1 text-amber-500">
                      <span className="text-4xl font-bold flex items-center">
                        <IndianRupee className="h-8 w-8 stroke-[3]" />
                        {room.price.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground font-medium">
                        /month
                      </span>
                    </div>
                  </div>

                  <Separator className="mb-6" />

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-5 w-5" />
                        <span>Room Capacity</span>
                      </div>
                      <span className="font-semibold">{room.beds_total} Person(s)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <BedDouble className="h-5 w-5" />
                        <span>Available Beds</span>
                      </div>
                      <span
                        className={
                          room.beds_available > 0
                            ? "font-semibold text-green-600 dark:text-green-500"
                            : "font-semibold text-destructive"
                        }
                      >
                        {room.beds_available} Bed(s)
                      </span>
                    </div>
                  </div>

                  <BookingModal roomId={room.id} roomName={room.room_name}>
                    <Button
                      size="lg"
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white text-base h-12"
                      disabled={!room.is_available || room.beds_available === 0}
                    >
                      {!room.is_available || room.beds_available === 0
                        ? "Currently Sold Out"
                        : "Book This Room"}
                    </Button>
                  </BookingModal>

                  <p className="text-center text-xs text-muted-foreground mt-4">
                    No payment required to reserve.
                    <br /> You'll pay when you move in.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Section>
    </PageTransition>
  );
}
