import Link from "next/link";

export default function CheckEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4.5">
      <div className="flex w-full max-w-sm flex-col items-center text-center">
        <h1 className="mt-4 text-2xl font-bold tracking-tight">
          Check Your Email
        </h1>
        <p className="text-muted-foreground mt-2">
          We have sent a verification link to your email address. Please check
          your inbox (and spam folder) and click the link to continue.
        </p>
        <p className="text-muted-foreground mt-4">
          <Link href="/login" className="text-primary underline">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
