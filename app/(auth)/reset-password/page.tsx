import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/auth/ResetForm";

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
