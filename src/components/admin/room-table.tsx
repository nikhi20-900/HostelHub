"use client";

import { useState } from "react";
import Image from "next/image";
import { Edit, Image as ImageIcon, MoreHorizontal, Plus, Trash2 } from "lucide-react";

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Room } from "@/lib/types";
import { rooms as initialRooms } from "@/lib/mock-data";
import { RoomFormModal } from "./room-form-modal";

export function RoomTable() {
  const [data, setData] = useState<Room[]>(initialRooms);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [deleteRoomId, setDeleteRoomId] = useState<string | null>(null);

  // Filter logic
  const filteredData = data.filter((room) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        room.room_name.toLowerCase().includes(q) ||
        room.room_type.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Handlers
  const handleToggleAvailability = (roomId: string, currentStatus: boolean) => {
    setData(prev => 
      prev.map(room => 
        room.id === roomId ? { ...room, is_available: !currentStatus } : room
      )
    );
    toast.success(`Room marked as ${!currentStatus ? 'Available' : 'Unavailable'}`);
  };

  const handleDelete = () => {
    if (deleteRoomId) {
      setData(prev => prev.filter(r => r.id !== deleteRoomId));
      toast.success("Room deleted successfully");
      setDeleteRoomId(null);
    }
  };

  const handleSaveRoom = (roomData: Room) => {
    if (selectedRoom) {
      // Edit existing
      setData(prev => prev.map(r => r.id === roomData.id ? roomData : r));
    } else {
      // Add new
      setData(prev => [roomData, ...prev]);
    }
  };

  const openEditModal = (room: Room) => {
    setSelectedRoom(room);
    setIsFormOpen(true);
  };

  const openAddModal = () => {
    setSelectedRoom(null);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-4">
      {/* Search & Add Action */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:max-w-sm">
          <Input 
            placeholder="Search by room name or type..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={openAddModal} className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white">
          <Plus className="mr-2 h-4 w-4" /> Add New Room
        </Button>
      </div>

      {/* Table Section */}
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Preview</TableHead>
              <TableHead>Room Details</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Rent/mo</TableHead>
              <TableHead>Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((room) => (
                <TableRow key={room.id}>
                  <TableCell>
                    <div className="relative h-10 w-12 rounded overflow-hidden bg-muted">
                      {room.images.length > 0 ? (
                        <Image src={room.images[0]} alt={room.room_name} fill className="object-cover" />
                      ) : (
                        <ImageIcon className="h-4 w-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{room.room_name}</div>
                    <Badge variant="secondary" className="mt-1 font-normal text-xs">{room.room_type}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {room.beds_available} / {room.beds_total} available
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    ₹{room.price.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Switch 
                      checked={room.is_available} 
                      onCheckedChange={() => handleToggleAvailability(room.id, room.is_available)}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => openEditModal(room)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive" onClick={() => setDeleteRoomId(room.id)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete Room
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No rooms found matching "{searchQuery}"
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Forms & Dialogs */}
      <RoomFormModal 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
        room={selectedRoom}
        onSave={handleSaveRoom}
      />

      <AlertDialog open={!!deleteRoomId} onOpenChange={() => setDeleteRoomId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the room
              listing and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Yes, delete room
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
