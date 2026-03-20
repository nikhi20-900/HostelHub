"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Building2, Loader2, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTransition } from "@/components/shared/page-transition";
import { loginSchema } from "@/lib/validations";

type LoginFormValues = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setIsSubmitting(true);
    setError(null);
    
    // Simulate auth check
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    if (data.email === "admin@hostelhub.com" && data.password === "admin123") {
      router.push("/admin/dashboard");
    } else {
      setError("Invalid email or password");
      setIsSubmitting(false);
    }
  }

  return (
    <PageTransition>
      <div className="flex min-h-[100dvh] items-center justify-center p-4">
        
        {/* Background Decorative Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 25px 25px, currentColor 1px, transparent 0)",
            backgroundSize: "50px 50px",
          }} />
        </div>

        <div className="w-full max-w-[400px] z-10">
          <div className="flex flex-col items-center mb-8 text-center space-y-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 shadow-lg">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight mt-4">HostelHub Admin</h1>
            <p className="text-sm text-muted-foreground">
              Sign in to manage rooms, bookings, and operations.
            </p>
          </div>

          <Card className="shadow-xl border-border/50">
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl">Authentication</CardTitle>
              <CardDescription>
                Enter your credentials to access the portal.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  
                  {error && (
                    <div className="p-3 text-sm rounded-md bg-destructive/15 text-destructive font-medium border border-destructive/20 flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      {error}
                    </div>
                  )}

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="admin@hostelhub.com" 
                            autoComplete="email"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Password</FormLabel>
                        </div>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="••••••••" 
                            autoComplete="current-password"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white mt-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              </Form>

              {/* Development Hint */}
              <div className="mt-6 border-t pt-4">
                <p className="text-xs text-center text-muted-foreground">
                  Default login: <strong>admin@hostelhub.com / admin123</strong>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}
