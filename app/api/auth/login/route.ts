import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json(
      { error: 'Email and password are required' },
      { status: 400 },
    )
  }

  const normalizedEmail = email.toLowerCase().trim()

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  })

  if (!user || !user.password) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 })
  }

  if (!user.emailVerified) {
    return NextResponse.json(
      { error: 'Please verify your email' },
      { status: 400 },
    )
  }

  const passwordsMatch = await bcrypt.compare(password, user.password)
  if (!passwordsMatch) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 })
  }

  return NextResponse.json({
    status: 200,
    message: 'Login successful',
  })
}
