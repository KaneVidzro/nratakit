"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/client";

const formSchema = z.object({
  email: z.email(),
});

export const ResendVerificationForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      await authClient.sendVerificationEmail(
        {
          email: data.email,
          callbackURL: "/dashboard",
        },
        {
          onSuccess: () => {
            toast.success("Verification email sent! Check your inbox.");
            form.reset();
            router.push("/check-email");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        }
      );
    } catch {
      toast.error("Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4.5">
      <div className="flex w-full max-w-sm flex-col items-center">
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">
          Resend Verification Email
        </h1>
        <p className="text-muted-foreground">
          Enter your email to resend the verification link.
        </p>

        <Form {...form}>
          <form
            className="mt-8 w-full space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      className="w-full py-5"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="mt-4 w-full py-5"
              disabled={loading}
            >
              {loading ? "Sending..." : "Resend verification"}
            </Button>
          </form>
        </Form>

        <p className="mt-5 text-center text-sm">
          <Link href="/login" className="text-muted-foreground pl-1 underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
