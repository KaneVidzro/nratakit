import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendMail } from '@/lib/mailer'
import { WelcomeEmail } from '@/emails/WelcomeEmail'

export async function POST(req: NextRequest) {
  const { token } = await req.json()

  if (!token) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 })
  }

  const verificationToken = await prisma.verificationToken.findUnique({
    where: {
      token,
    },
  })

  if (!verificationToken) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 })
  }

  await prisma.user.update({
    where: {
      email: verificationToken.email,
    },
    data: {
      emailVerified: new Date(),
    },
  })

  const user = await prisma.user.findUnique({
    where: {
      email: verificationToken.email,
    },
  })

  const WelcomeEmailUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`

  await sendMail({
    to: verificationToken.email,
    subject: 'Welcome to nrataKit',
    react: WelcomeEmail({
      name: user?.name ?? 'there',
      url: WelcomeEmailUrl,
    }),
  })

  return NextResponse.json({
    status: 200,
    message: 'Verification successful',
  })
}
