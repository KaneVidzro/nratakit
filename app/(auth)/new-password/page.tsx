import { Suspense } from "react";
import { NewPasswordForm } from "@/components/auth/new-password";

export default function page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center px-4.5">
          <p className="text-center text-gray-500">Loading...</p>
        </div>
      }
    >
      <NewPasswordForm />
    </Suspense>
  );
}
