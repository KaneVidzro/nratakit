import { Suspense } from 'react'
import { VerifyEmail } from '@/components/auth/verify-email'

export default function page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center px-4.5">
          <p className="text-gray-500 text-center">Loading...</p>
        </div>
      }>
      <VerifyEmail />
    </Suspense>
  )
}
