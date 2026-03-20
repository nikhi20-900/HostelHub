"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UploadCloud, X, Loader2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Room, ROOM_TYPES } from "@/lib/types";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

// Temporary generic schema matching the form
const roomFormSchema = z.object({
  room_name: z.string().min(2, "Name must be at least 2 characters"),
  room_type: z.enum(ROOM_TYPES as [string, ...string[]]),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().min(1, "Price is required"),
  beds_total: z.coerce.number().min(1, "Beds total required"),
  beds_available: z.coerce.number().min(0),
  facilities: z.string().min(1, "Enter at least one facility, separated by commas"),
  is_available: z.boolean().default(true),
});

type RoomFormValues = z.infer<typeof roomFormSchema>;

interface RoomFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  room?: Room | null;
  onSave: (data: any) => void;
}

export function RoomFormModal({ open, onOpenChange, room, onSave }: RoomFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<string[]>(room?.images || []);
  
  const isEditing = !!room;

  const form = useForm<RoomFormValues>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: room ? {
      room_name: room.room_name,
      room_type: room.room_type,
      description: room.description,
      price: room.price,
      beds_total: room.beds_total,
      beds_available: room.beds_available,
      facilities: room.facilities.join(", "),
      is_available: room.is_available,
    } : {
      room_name: "",
      room_type: "Single",
      description: "",
      price: 0,
      beds_total: 1,
      beds_available: 1,
      facilities: "WiFi, AC, Study Desk",
      is_available: true,
    },
  });

  // Reset form when modal opens with new data
  useState(() => {
    if (open && form) form.reset();
  });

  async function onSubmit(data: RoomFormValues) {
    if (images.length === 0) {
      toast.error("Please add at least one image");
      return;
    }

    setIsSubmitting(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSave({
      ...data,
      id: room?.id || `room-${Date.now()}`,
      facilities: data.facilities.split(",").map(f => f.trim()).filter(Boolean),
      images,
    });
    
    setIsSubmitting(false);
    onOpenChange(false);
    toast.success(`Room ${isEditing ? 'updated' : 'added'} successfully`);
  }

  // Mock image upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // In a real app we'd upload to Supabase Storage here.
      // For mock UI, we'll just generate an object URL to preview locally.
      const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages].slice(0, 5)); // Cap at 5 images
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImages(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Room' : 'Add New Room'}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Update the details for this room below." : "Enter the details for the new room offering."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
            
            {/* Image Upload Area */}
            <div>
              <FormLabel className="block mb-2">Room Images (Max 5)</FormLabel>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                {images.map((src, idx) => (
                  <div key={idx} className="relative aspect-video rounded-md overflow-hidden border">
                    <Image src={src} alt="Room preview" fill className="object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 bg-red-500/80 text-white p-1 rounded-full hover:bg-red-500 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {images.length < 5 && (
                  <label className="flex flex-col items-center justify-center aspect-video rounded-md border-2 border-dashed border-muted-foreground/25 hover:border-amber-500/50 hover:bg-amber-500/5 transition-colors cursor-pointer text-muted-foreground hover:text-amber-500">
                    <UploadCloud className="h-6 w-6 mb-2" />
                    <span className="text-xs font-medium">Upload Image</span>
                    <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
                  </label>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="room_name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Name</FormLabel>
                  <FormControl><Input placeholder="e.g. Comfort Single 101" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              
              <FormField control={form.control} name="room_type" render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {ROOM_TYPES.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="price" render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Rent (₹)</FormLabel>
                  <FormControl><Input type="number" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="beds_total" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Beds</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="beds_available" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available Beds</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </div>

            <FormField control={form.control} name="facilities" render={({ field }) => (
              <FormItem>
                <FormLabel>Facilities (Comma separated)</FormLabel>
                <FormControl><Input placeholder="WiFi, AC, Study Desk" {...field} /></FormControl>
                <FormDescription>Separate multiple facilities with a comma</FormDescription>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel>Room Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe the room..." className="resize-none h-24" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="is_available" render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Listing Active</FormLabel>
                  <FormDescription>
                    Turn off to hide this room from public listings.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )} />

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditing ? 'Save Changes' : 'Create Room'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
