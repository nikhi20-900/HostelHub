import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[+]?[\d\s-]+$/, "Invalid phone number format"),
  email: z.string().email("Invalid email address"),
  room_id: z.string().min(1, "Please select a room"),
  move_in_date: z.string().min(1, "Please select a move-in date"),
  message: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const roomFormSchema = z.object({
  room_name: z.string().min(2, "Room name is required"),
  room_type: z.enum(["Single", "Double", "Dormitory", "Deluxe"]),
  price: z.coerce.number().positive("Price must be positive"),
  beds_total: z.coerce.number().int().positive("Must have at least 1 bed"),
  beds_available: z.coerce.number().int().min(0, "Cannot be negative"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  is_available: z.boolean().default(true),
});

export type RoomFormData = z.infer<typeof roomFormSchema>;
