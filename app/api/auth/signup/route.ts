import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { sendMail } from '@/lib/mailer'
import { randomBytes } from 'crypto'
import { VerificationEmail } from '@/emails/VerificationEmail'

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json()

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: 'Email and password are required' },
      { status: 400 },
    )
  }

  const normalizedEmail = email.toLowerCase().trim()

  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  })

  if (existingUser) {
    return NextResponse.json({ error: 'Email already exists' }, { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const token = randomBytes(32).toString('hex')
  const expires = new Date(Date.now() + 12 * 60 * 60 * 1000)

  // 🔐 Use Prisma transaction
  await prisma.$transaction([
    prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        password: hashedPassword,
      },
    }),
    prisma.verificationToken.create({
      data: {
        token,
        expires,
        email: normalizedEmail,
      },
    }),
  ])

  const VerifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email?token=${token}`

  await sendMail({
    to: normalizedEmail,
    subject: 'Verify your email',
    react: VerificationEmail({ name, url: VerifyUrl }),
  })

  return NextResponse.json({
    status: 200,
    message: 'Signup successful',
  })
}
