"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Building2, 
  LayoutDashboard, 
  Settings, 
  BedDouble, 
  CalendarDays,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Bookings",
    href: "/admin/bookings",
    icon: CalendarDays,
  },
  {
    title: "Rooms",
    href: "/admin/rooms",
    icon: BedDouble,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-full flex-col bg-card border-r">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/admin/dashboard" className="flex items-center gap-2 font-bold text-xl">
          <Building2 className="h-6 w-6 text-amber-500" />
          <span>Hostel<span className="text-amber-500">Hub</span> Admin</span>
        </Link>
      </div>
      
      <nav className="flex-1 space-y-1 p-4">
        {sidebarLinks.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive 
                  ? "bg-amber-500/10 text-amber-600 dark:text-amber-500" 
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              <link.icon className={cn("h-5 w-5", isActive ? "text-amber-500" : "")} />
              {link.title}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t mt-auto">
        <Link href="/admin/login">
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Button>
        </Link>
      </div>
    </div>
  );
}
