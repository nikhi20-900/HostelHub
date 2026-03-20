import { BookingTable } from "@/components/admin/booking-table";

export default function AdminBookingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Booking Management</h2>
          <p className="text-muted-foreground mt-1">
            Review, approve, or reject student accommodation requests.
          </p>
        </div>
      </div>

      <BookingTable />
    </div>
  );
}
