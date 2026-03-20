import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - Hidden on mobile, fixed width on desktop */}
      <aside className="hidden w-64 flex-shrink-0 md:block">
        <AdminSidebar />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-muted/20">
        {/* Mobile Header (Optional: Can add a hamburger menu here later) */}
        <div className="md:hidden flex h-16 items-center border-b bg-card px-4 font-bold text-lg">
          HostelHub Admin
        </div>
        
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
