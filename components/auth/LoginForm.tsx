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
import { signIn } from "@/lib/auth/client";
import { toast } from "sonner";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Minimum 8 characters long"),
});

export function LoginForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await signIn.email(
      {
        email: data.email,
        password: data.password,
        callbackURL: "/account",
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onResponse: () => {
          setLoading(false);
        },
        onSuccess: () => {
          toast.success("Signed in successfully");
        },
        onError: (ctx) => {
          setLoading(false);
          toast.error(ctx.error.message);
        },
      },
    );
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    await signIn.social(
      {
        provider,
        callbackURL: "/account",
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onResponse: () => {
          setLoading(false);
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
          Welcome back! 👋
        </h1>
        <p className="text-muted-foreground">
          Enter your data below to login to your account.
        </p>

        <div className="grid gap-2 grid-cols-2 w-full mt-8">
          <Button
            variant="outline"
            className="w-full gap-3 py-5"
            disabled={loading}
            onClick={() => handleSocialSignIn("google")}
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
            onClick={() => handleSocialSignIn("github")}
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

        <div className="my-7 w-full flex items-center justify-center gap-4">
          <Separator className="flex-1" />
          <span className="text-sm whitespace-nowrap text-muted-foreground">
            or continue with
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
                      href="/forgot-password"
                      className="text-muted-foreground hover:underline"
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
            <Button
              type="submit"
              className="mt-4 w-full py-5"
              disabled={loading}
            >
              {loading ? "Loading..." : "Continue with Email"}
            </Button>
          </form>
        </Form>

        <p className="mt-5 text-sm text-center text-muted-foreground">
          Don&apos;t have an account yet?
          <Link
            href="/signup"
            className="pl-1 underline font-medium hover:text-primary"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
