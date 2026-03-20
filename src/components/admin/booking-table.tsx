"use client";

import { useState } from "react";
import { CheckCircle, Clock, Search, XCircle, MoreHorizontal } from "lucide-react";

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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Booking, ROLES, ROOM_TYPES, Room } from "@/lib/types";
import { bookings as initialBookings, rooms as initialRooms } from "@/lib/mock-data";

export function BookingTable() {
  const [data, setData] = useState<Booking[]>(initialBookings);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  // Derived state
  const filteredData = data.filter((booking) => {
    // Status Filter
    if (statusFilter !== "All" && booking.status !== statusFilter) return false;
    
    // Search Query (Student name, email, or room id mock)
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const roomName = getRoomName(booking.room_id).toLowerCase();
      return (
        booking.student_name.toLowerCase().includes(q) ||
        booking.email.toLowerCase().includes(q) ||
        booking.id.toLowerCase().includes(q) ||
        roomName.includes(q)
      );
    }
    
    return true;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Helper functions
  function getRoomName(roomId: string) {
    return initialRooms.find(r => r.id === roomId)?.room_name || "Unknown Room";
  }

  function handleStatusUpdate(bookingId: string, newStatus: Booking["status"]) {
    setData(prev => 
      prev.map(booking => 
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      )
    );
    toast.success(`Booking ${newStatus === "Accepted" ? "Approved" : "Rejected"} successfully`);
  }

  function getStatusBadge(status: string) {
    if (status === "Pending") return <Badge variant="secondary" className="bg-amber-500/10 text-amber-600"><Clock className="mr-1 h-3 w-3" /> Pending</Badge>;
    if (status === "Accepted") return <Badge className="bg-green-500 hover:bg-green-600"><CheckCircle className="mr-1 h-3 w-3" /> Accepted</Badge>;
    if (status === "Rejected") return <Badge variant="destructive"><XCircle className="mr-1 h-3 w-3" /> Rejected</Badge>;
    return <Badge variant="outline">{status}</Badge>;
  }

  return (
    <div className="space-y-4">
      {/* Controls: Search & Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <Tabs 
          defaultValue="All" 
          className="w-full sm:w-auto"
          onValueChange={(val) => {
            setStatusFilter(val);
            setPage(1);
          }}
        >
          <TabsList>
            <TabsTrigger value="All">All Bookings</TabsTrigger>
            <TabsTrigger value="Pending">Pending</TabsTrigger>
            <TabsTrigger value="Accepted">Accepted</TabsTrigger>
            <TabsTrigger value="Rejected">Rejected</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search bookings..." 
            className="pl-9" 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Applicant</TableHead>
              <TableHead>Room Details</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-mono text-xs uppercase text-muted-foreground">
                    #{booking.id.split("-")[0]}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{booking.student_name}</div>
                    <div className="text-xs text-muted-foreground">{booking.email}</div>
                    <div className="text-xs text-muted-foreground">{booking.phone}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{getRoomName(booking.room_id)}</div>
                    {/* Simplified mapping for mock display */}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">In: {new Date(booking.move_in_date).toLocaleDateString()}</div>
                    <div className="text-xs text-muted-foreground">
                      Applied: {new Date(booking.created_at).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(booking.status)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem disabled={booking.status === "Accepted"} onClick={() => handleStatusUpdate(booking.id, "Accepted")}>
                          <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                          Approve Booking
                        </DropdownMenuItem>
                        <DropdownMenuItem disabled={booking.status === "Rejected"} onClick={() => handleStatusUpdate(booking.id, "Rejected")}>
                          <XCircle className="mr-2 h-4 w-4 text-destructive" />
                          Reject Booking
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No bookings found matching your criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{(page - 1) * itemsPerPage + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(page * itemsPerPage, filteredData.length)}
            </span>{" "}
            of <span className="font-medium">{filteredData.length}</span> bookings
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
