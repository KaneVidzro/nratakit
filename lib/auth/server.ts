import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mailer";
import { ForgotPasswordEmail } from "@/emails/ForgotPasswordEmail";
import { ResetSuccessEmail } from "@/emails/ResetSuccessEmail";
import { VerificationEmail } from "@/emails/VerificationEmail";
import { ApproveEmailChangeEmail } from "@/emails/ApproveEmailChangeEmail";

export const auth = betterAuth({
  trustedOrigins: [process.env.NEXT_PUBLIC_BASE_URL!],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
      allowUnlinkingAll: true,
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,

    sendResetPassword: async ({ user, url }) => {
      await sendMail({
        to: user.email,
        subject: "Reset your password",
        react: ForgotPasswordEmail({ name: user.name ?? user.email, url }),
      });
    },
    onPasswordReset: async ({ user }) => {
      await sendMail({
        to: user.email,
        subject: "Password Reset Success",
        react: ResetSuccessEmail({ name: user.name ?? user.email }),
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendMail({
        to: user.email,
        subject: "Verify your email address",
        react: VerificationEmail({ name: user.name ?? user.email, url }),
      });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
  },
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ user, newEmail, url }) => {
        await sendMail({
          to: user.email,
          subject: "Approve email change",
          react: ApproveEmailChangeEmail({
            name: user.name ?? user.email,
            newEmail,
            url,
          }),
        });
      },
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      prompt: "select_account", // Ensures the user can select an account
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  advanced: {
    cookiePrefix: "nratakit",
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  plugins: [nextCookies()],
});
