import { BookingForm } from "@/components/shared/booking-form";
import { Section, SectionHeader } from "@/components/shared/section";
import { PageTransition } from "@/components/shared/page-transition";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin } from "lucide-react";

interface BookingPageProps {
  searchParams: {
    room?: string;
  };
}

export default function BookingPage({ searchParams }: BookingPageProps) {
  const preselectedRoom = searchParams.room || undefined;

  return (
    <PageTransition>
      <div className="bg-muted/30 pt-12 pb-8 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Book Your Stay"
            subtitle="Secure your spot at HostelHub. Fill out the form below and our team will get back to you with the confirmation details."
            className="mb-0"
          />
        </div>
      </div>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form Column */}
          <div className="lg:col-span-2">
            <Card className="border shadow-md">
              <CardContent className="p-6 sm:p-8">
                <BookingForm defaultRoomId={preselectedRoom} />
              </CardContent>
            </Card>
          </div>

          {/* Info Column */}
          <div className="space-y-6">
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6">
              <h3 className="font-semibold text-lg text-amber-600 dark:text-amber-500 mb-2">
                Why Book With Us?
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span>No hidden fees or agents. Book directly for the best price.</span>
                </li>
                <li className="flex gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span>Your booking is just a request. No payment needed until check-in.</span>
                </li>
                <li className="flex gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span>Flexible cancellation up to 48 hours before move-in date.</span>
                </li>
              </ul>
            </div>

            <Card className="border shadow-sm">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-lg mb-4">Need Help?</h3>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Call Us</p>
                    <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Email Us</p>
                    <p className="text-sm text-muted-foreground">bookings@hostelhub.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Visit Us</p>
                    <p className="text-sm text-muted-foreground">123 University Road, City</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </PageTransition>
  );
}
