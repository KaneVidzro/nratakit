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

const formSchema = z.object({
  email: z.email(),
});

export const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    setLoading(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4.5">
      <div className="max-w-sm w-full flex flex-col items-center">
        <h1 className="mt-4 text-2xl font-bold tracking-tight">
          Forgot your password?
        </h1>
        <p className="text-muted-foreground">
          Enter your email to get a password reset link.
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
              {loading ? "Sending..." : "Send reset link"}
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
};
