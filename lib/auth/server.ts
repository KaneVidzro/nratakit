import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mailer";
import { nextCookies } from "better-auth/next-js";
import { twoFactor, admin } from "better-auth/plugins";
import VerificationEmail from "@/emails/verification-email";
import ResetSuccessEmail from "@/emails/resetsuccess-email";
import ResetPasswordEmail from "@/emails/resetpassword-email";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  appName: "nratakit",
  cookieCache: {
    enabled: true,
    maxAge: 5 * 60, // Cache duration in seconds
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  // Correctly configure email and password options
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendMail({
        to: user.email,
        subject: "[LapNDial] Reset your password",
        react: ResetPasswordEmail({ name: user.name, url }),
      });
    },
    onPasswordReset: async ({ user }) => {
      await sendMail({
        to: user.email,
        subject: "[LapNDial] Password reset successful",
        react: ResetSuccessEmail({
          name: user.name,
          loginUrl: `${process.env.NEXT_PUBLIC_URL}/login`,
        }),
      });
    },
  },
  // Correctly configure email verification options separately
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendMail({
        to: user.email,
        subject: "[LapNDial] Verify your email address",
        react: VerificationEmail({ name: user.name, url }),
      });
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      accessType: "offline",
      prompt: "select_account consent",
    },
  },
  plugins: [twoFactor(), admin(), nextCookies()],
});
