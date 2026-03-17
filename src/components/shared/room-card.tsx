import Link from "next/link";
import Image from "next/image";
import { BedDouble, IndianRupee, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Room } from "@/lib/types";

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  return (
    <Link href={`/rooms/${room.id}`}>
      <Card className="group flex h-full flex-col overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={room.images[0] || "/placeholder.svg"}
            alt={room.room_name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
            <Badge className="bg-amber-500 text-white border-0 shadow-sm whitespace-nowrap">
              {room.room_type}
            </Badge>
            {!room.is_available && (
              <Badge variant="destructive" className="shadow-sm whitespace-nowrap">
                Sold Out
              </Badge>
            )}
            {room.is_available && room.beds_available <= 2 && (
              <Badge className="bg-red-500 hover:bg-red-600 border-0 text-white shadow-sm whitespace-nowrap">
                Only {room.beds_available} left
              </Badge>
            )}
          </div>
        </div>

        <CardContent className="flex flex-1 flex-col p-5">
          <div className="mb-2 flex items-start justify-between gap-4">
            <h3 className="font-semibold text-xl line-clamp-1">{room.room_name}</h3>
            <div className="flex shrink-0 items-center justify-center rounded-full bg-muted w-8 h-8 text-muted-foreground" title={`Capacity: ${room.beds_total}`}>
              <Users className="h-4 w-4" />
              <span className="sr-only">Total capacity: {room.beds_total}</span>
            </div>
          </div>
          
          <p className="mb-4 text-sm text-muted-foreground line-clamp-2 flex-grow">
            {room.description}
          </p>
          
          <div className="mt-auto space-y-4">
            <div className="flex flex-wrap gap-1.5">
              {room.facilities.slice(0, 3).map((facility) => (
                <Badge key={facility} variant="secondary" className="text-xs font-normal">
                  {facility}
                </Badge>
              ))}
              {room.facilities.length > 3 && (
                <Badge variant="secondary" className="text-xs font-normal">
                  +{room.facilities.length - 3} more
                </Badge>
              )}
            </div>

            <div className="flex items-center justify-between border-t pt-4">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Rent</span>
                <div className="flex items-baseline gap-1 text-amber-500 font-bold">
                  <span className="text-lg flex items-center"><IndianRupee className="h-4 w-4 stroke-[3]" />{room.price.toLocaleString()}</span>
                  <span className="text-xs font-normal text-muted-foreground">/mo</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Availability</span>
                <div className="flex items-center gap-1.5 text-sm font-medium">
                  <BedDouble className="h-4 w-4 text-muted-foreground" />
                  <span className={room.beds_available > 0 ? "text-foreground" : "text-destructive"}>
                    {room.beds_available} beds
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
