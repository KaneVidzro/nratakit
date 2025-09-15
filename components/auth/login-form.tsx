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
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/client";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Minimum 8 characters long"),
  rememberMe: z.boolean().optional(),
});

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      await authClient.signIn.email(
        {
          email: data.email,
          password: data.password,
          callbackURL: "/dashboard",
          rememberMe: data.rememberMe ?? false,
        },
        {
          onSuccess: () => {
            toast.success("Login successful!");
            router.push("/dashboard");
          },
          onError: (ctx) => {
            if (ctx.error.status === 403) {
              router.push("/resend-verification");
            }
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

  const handleSocialLogin = async (provider: string) => {
    setLoading(true);
    try {
      await authClient.signIn.social({
        provider: provider,
        callbackURL: "/dashboard",
      });
    } catch {
      toast.error("Social login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4.5">
      <div className="flex w-full max-w-sm flex-col items-center">
        <h1 className="mt-4 text-2xl font-bold tracking-tight">
          Welcome back! 👋
        </h1>
        <p className="text-muted-foreground">
          Enter your credentials below to sign in.
        </p>

        <div className="mt-8 grid w-full grid-cols-2 gap-2">
          <Button
            variant="outline"
            className="w-full gap-3 py-5"
            disabled={loading}
            onClick={() => handleSocialLogin("google")}
          >
            <Image
              src="/assets/icons/google.svg"
              alt="google"
              width={20}
              height={20}
              className="mr-2"
            />
            Google
          </Button>
          <Button
            variant="outline"
            className="w-full gap-3 py-5"
            disabled={loading}
            onClick={() => handleSocialLogin("github")}
          >
            <Image
              src="/assets/icons/github.svg"
              alt="github"
              width={20}
              height={20}
              className="mr-2"
            />
            Github
          </Button>
        </div>

        <div className="my-7 flex w-full items-center justify-center gap-4">
          <Separator className="flex-1" />
          <span className="text-muted-foreground text-sm whitespace-nowrap">
            OR
          </span>
          <Separator className="flex-1" />
        </div>

        <Form {...form}>
          <form
            className="w-full space-y-4"
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link
                      href="/reset-password"
                      className="text-muted-foreground text-sm hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
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
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={loading}
                    className="border-primary border"
                  />

                  <FormLabel className="text-sm">Remember me</FormLabel>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mt-4 w-full py-5"
              disabled={loading}
            >
              {loading ? "Loading..." : "Continue with Email"}
            </Button>
          </form>
        </Form>

        <p className="mt-8 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-muted-foreground pl-1 underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};
