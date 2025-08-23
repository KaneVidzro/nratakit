import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendMail } from '@/lib/mailer'
import { randomBytes } from 'crypto'
import { ResetPasswordEmail } from '@/emails/ResetPasswordEmail'

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  const normalizedEmail = email.toLowerCase().trim()

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  })

  if (!user) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  // delete old password reset token
  await prisma.passwordResetToken.deleteMany({
    where: { email: normalizedEmail },
  })

  const token = randomBytes(32).toString('hex')
  const expires = new Date(Date.now() + 3600000)

  await prisma.passwordResetToken.create({
    data: {
      token,
      expires,
      email: normalizedEmail,
    },
  })

  // send reset email

  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/new-password?token=${token}`

  await sendMail({
    to: normalizedEmail,
    subject: 'Reset your password',
    react: ResetPasswordEmail({
      name: user.name ?? 'there',
      url: resetUrl,
    }),
  })

  return NextResponse.json({
    status: 200,
    message: 'Password reset email sent',
  })
}
