"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BookingForm } from "./booking-form";

interface BookingModalProps {
  children: React.ReactNode;
  roomId?: string;
  roomName?: string;
}

export function BookingModal({ children, roomId, roomName }: BookingModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {roomName ? `Book ${roomName}` : "Book Your Stay"}
          </DialogTitle>
          <DialogDescription>
            Fill out the form below to request a booking. Our team will contact you to confirm.
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <BookingForm 
            defaultRoomId={roomId} 
            onSuccess={() => setOpen(false)} 
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
