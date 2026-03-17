// Room types
export type RoomType = "Single" | "Double" | "Dormitory" | "Deluxe";

export interface Room {
  id: string;
  room_name: string;
  room_type: RoomType;
  price: number;
  beds_total: number;
  beds_available: number;
  description: string;
  images: string[];
  is_available: boolean;
  created_at: string;
  facilities: string[];
}

// Booking types
export type BookingStatus = "pending" | "accepted" | "rejected";

export interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string;
  room_id: string;
  room_name?: string;
  move_in_date: string;
  message: string;
  status: BookingStatus;
  created_at: string;
}

// Contact message
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

// Facility
export interface Facility {
  name: string;
  description: string;
  icon: string;
}

// Gallery image
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

// Stats for admin dashboard
export interface DashboardStats {
  totalRooms: number;
  pendingBookings: number;
  acceptedBookings: number;
  occupiedBeds: number;
  totalBeds: number;
}
