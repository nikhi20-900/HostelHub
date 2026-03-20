import { RoomTable } from "@/components/admin/room-table";

export default function AdminRoomsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Room Management</h2>
          <p className="text-muted-foreground mt-1">
            Add new hostel rooms, edit details, or update availability.
          </p>
        </div>
      </div>

      <RoomTable />
    </div>
  );
}
