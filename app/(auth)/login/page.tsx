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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const passwordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Minimum 8 characters long"),
});

const magicLinkSchema = z.object({
  email: z.string().email(),
});

import React from "react";

export default function LoginPage() {
  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(passwordSchema),
  });

  const magicLinkForm = useForm<z.infer<typeof magicLinkSchema>>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(magicLinkSchema),
  });

  const handlePasswordSubmit = (data: z.infer<typeof passwordSchema>) => {
    console.log("Password login:", data);
    // TODO: Call your login API here
  };

  const handleMagicLinkSubmit = (data: z.infer<typeof magicLinkSchema>) => {
    console.log("Magic link request:", data);
    // TODO: Trigger magic link email here
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
          <Button variant="outline" className="w-full gap-3 py-5">
            <Image
              src="/assets/icons/google.svg"
              alt="google"
              width={20}
              height={20}
              className="mr-2"
            />
            Google
          </Button>
          <Button variant="outline" className="w-full gap-3 py-5">
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

        <div className="flex w-full flex-col gap-6">
          <Tabs defaultValue="password">
            <TabsList className="w-full px-2 py-1">
              <TabsTrigger value="password" className="flex-1">
                Password
              </TabsTrigger>
              <TabsTrigger value="magiclink" className="flex-1">
                Magic Link
              </TabsTrigger>
            </TabsList>

            <TabsContent value="password">
              <Form {...passwordForm}>
                <form
                  className="w-full space-y-4"
                  onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
                >
                  <FormField
                    control={passwordForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            className="w-full py-5"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Password</FormLabel>
                          <a
                            href="/forgot-password"
                            className="text-muted-foreground hover:underline"
                          >
                            Forgot password?
                          </a>
                        </div>
                        <FormControl>
                          <Input
                            type="password"
                            className="w-full py-5"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="mt-4 w-full py-5">
                    Continue with Email
                  </Button>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="magiclink">
              <Form {...magicLinkForm}>
                <form
                  className="w-full space-y-4"
                  onSubmit={magicLinkForm.handleSubmit(handleMagicLinkSubmit)}
                >
                  <FormField
                    control={magicLinkForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            className="w-full py-5"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="mt-4 w-full py-6">
                    Send me a magic link
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </div>

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
