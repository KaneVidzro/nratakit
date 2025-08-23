'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'

const formSchema = z
  .object({
    newPassword: z.string().min(8, 'Minimum 8 characters long'),
    confirmPassword: z.string().min(8, 'Minimum 8 characters long'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const NewPasswordForm = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
    resolver: zodResolver(formSchema),
  })

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4.5">
        <div className="max-w-sm w-full text-center">
          <h1 className="text-2xl font-bold tracking-tight">Invalid Token</h1>
          <p className="text-muted-foreground mt-2">
            The password reset link is invalid or has expired.
          </p>
        </div>
      </div>
    )
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true)

    const res = await fetch('/api/auth/new-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, token }),
    })

    const result = await res.json()

    if (!res.ok) {
      setLoading(false)
      toast.error(result.error || 'Something went wrong')
    } else {
      setLoading(false)
      toast.success(result.message || 'Password reset successfully')
      router.push('/auth/login')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4.5">
      <div className="max-w-sm w-full flex flex-col items-center">
        <h1 className="mt-4 text-2xl font-bold tracking-tight">
          Reset Password
        </h1>
        <p className="text-muted-foreground">
          Please fill in the form below to reset your password
        </p>

        <Form {...form}>
          <form
            className="w-full space-y-4 mt-8"
            onSubmit={form.handleSubmit(onSubmit)}>
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
              disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
