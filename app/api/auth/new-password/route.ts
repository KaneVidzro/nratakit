import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendMail } from '@/lib/mailer'
import { ResetSuccessEmail } from '@/emails/ResetSuccessEmail'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  const { token, newPassword } = await req.json()

  if (!token || !newPassword) {
    return NextResponse.json(
      { error: 'Invalid token or new password' },
      { status: 400 },
    )
  }

  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { token },
  })

  if (!resetToken || resetToken.expires < new Date()) {
    return NextResponse.json(
      { error: 'Token is invalid or expired' },
      { status: 400 },
    )
  }

  await prisma.user.update({
    where: { email: resetToken.email },
    data: { password: await bcrypt.hash(newPassword, 10) },
  })

  await prisma.passwordResetToken.delete({
    where: { token },
  })

  const user = await prisma.user.findUnique({
    where: { email: resetToken.email },
  })

  await sendMail({
    to: resetToken.email,
    subject: 'Your password has been reset',
    react: ResetSuccessEmail({
      name: user?.name ?? 'there',
    }),
  })

  return NextResponse.json({
    status: 200,
    message: 'Password updated successfully',
  })
}
