import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal | HostelHub",
  description: "HostelHub Management System",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/20">
      {children}
    </div>
  );
}
