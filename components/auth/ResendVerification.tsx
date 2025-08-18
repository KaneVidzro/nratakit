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
import { authClient } from "@/lib/auth/client";
import { toast } from "sonner";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email(),
});

export function ResendVerificationForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await authClient.sendVerificationEmail(
      {
        email: data.email,
        callbackURL: "/login",
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onResponse: () => {
          setLoading(false);
        },
        onSuccess: () => {
          toast.success("Verification email sent successfully");
        },
        onError: (ctx) => {
          setLoading(false);
          toast.error(ctx.error.message);
        },
      },
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4.5">
      <div className="max-w-sm w-full flex flex-col items-center">
        <h1 className="mt-4 text-2xl font-bold tracking-tight">
          Resend Verification Email
        </h1>
        <p className="text-muted-foreground">
          Please enter your email address and we&apos;ll send you a link to
          resend your verification email
        </p>

        <Form {...form}>
          <form
            className="w-full space-y-4 mt-8"
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
              {loading ? "Sending..." : "Resend Verification Email"}
            </Button>
          </form>
        </Form>

        <p className="mt-5 text-sm text-center">
          <Link href="/login" className="pl-1 underline text-muted-foreground">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
