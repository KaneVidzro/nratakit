import {
  Body,
  Button, // Added Button import
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link, // Added Link import
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

interface Props {
  name: string;
  loginUrl: string; // Added loginUrl to props
}

export default function ResetSuccessEmail({ name, loginUrl }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Your nratakit password has been successfully reset</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px]">
              <Text className="mx-0 p-0 text-center text-2xl">
                <span className="font-bold tracking-tighter">nratakit</span>
              </Text>
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-medium">
              Password Reset Successful
            </Heading>
            <Text className="text-[14px] leading-[24px]">Hello {name},</Text>
            <Text className="text-[14px] leading-[24px]">
              Your password has been successfully reset. You can now log in to
              your account using your new credentials.
            </Text>
            {/* Added a button for a prominent CTA */}
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-full bg-[#000000] px-5 py-3 text-[12px] font-semibold text-white no-underline"
                href={loginUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Log in to your account
              </Button>
            </Section>
            {/* Kept a fallback link for security and accessibility */}
            <Text className="text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:
            </Text>
            <Link
              href={loginUrl}
              className="text-[14px] leading-[24px] break-all text-[#0000EE] underline"
              rel="noopener noreferrer"
            >
              {loginUrl}
            </Link>
            <Text className="text-[14px] leading-[24px]">
              If you did not perform this action, please contact our support
              team immediately.
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[13px] leading-[24px] text-[#666666]">
              &copy; {new Date().getFullYear()} LapNDial. All rights reserved.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
