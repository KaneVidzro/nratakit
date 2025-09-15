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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth/client";
import Link from "next/link";

const formSchema = z
  .object({
    newPassword: z.string().min(8, "Minimum 8 characters long"),
    confirmPassword: z.string().min(8, "Minimum 8 characters long"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const NewPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(formSchema),
  });

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4.5">
        <div className="w-full max-w-sm text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-red-600">
            Invalid Token
          </h1>
          <p className="text-muted-foreground mt-2">
            The password reset link is invalid or has expired.
            <br />
            <Link href="/reset-password" className="text-primary underline">
              Request a new one
            </Link>
          </p>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      await authClient.resetPassword(
        {
          newPassword: data.newPassword,
          token,
        },

        {
          onSuccess: () => {
            toast.success("Password reset successfully");
            router.push("/login");
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
          Reset Password
        </h1>
        <p className="text-muted-foreground">
          Please fill in the form below to reset your password
        </p>

        <Form {...form}>
          <form
            className="mt-8 w-full space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="w-full py-5"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
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
              {loading ? "Resetting..." : "Update Password"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
