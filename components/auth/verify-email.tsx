'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const VerifyEmail = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const hasRun = useRef(false)

  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true

    const verifyEmail = async () => {
      if (!token) {
        setStatus('error')
        setMessage('Invalid verification token')
        toast.error('Invalid verification token')
        return
      }

      setStatus('loading')

      try {
        const res = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        })

        const result = await res.json()

        if (!res.ok) {
          setStatus('error')
          setMessage(result.error || 'Email verification failed')
          toast.error(result.error || 'Email verification failed')
        } else {
          setStatus('success')
          setMessage(result.message || 'Email verified successfully')
          toast.success(result.message || 'Email verified successfully')
        }
      } catch {
        setStatus('error')
        setMessage('Something went wrong')
        toast.error('Something went wrong')
      }
    }

    verifyEmail()
  }, [token])

  return (
    <div className="min-h-screen flex items-center justify-center px-4.5">
      <div className="max-w-sm w-full flex flex-col items-center text-center">
        {status === 'loading' && (
          <>
            <Loader2 className="animate-spin text-gray-500 h-6 w-6 mb-4" />
            <p className=" text-gray-600">Verifying your email...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <p className="text-red-600  mb-4">{message}</p>
            <Button variant="outline">
              <Link href="/auth/resend-verification">
                Resend Verification Email
              </Link>
            </Button>
          </>
        )}

        {status === 'success' && (
          <>
            <p className="text-green-600  mb-4">{message}</p>
            <Button asChild>
              <Link href="/auth/login">Go to Login</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
