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
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Minimum 8 characters long"),
});

export default function SignupPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4.5">
      <div className="max-w-sm w-full flex flex-col items-center">
        <h1 className="mt-4 text-2xl font-bold tracking-tight">
          Create an account
        </h1>
        <p className="text-muted-foreground">
          Please fill in the form below to create your account
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
                    <Input type="email" className="w-full py-5" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="w-full py-5" {...field} />
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

        <p className="mt-5 text-sm text-center">
          Already have an account?
          <Link href="/login" className="pl-1 underline text-muted-foreground">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
