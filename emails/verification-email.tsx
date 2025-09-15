import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

interface Props {
  name: string;
  url: string;
}

export default function VerificationEmail({ name, url }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Verify your email address for nratakit</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px]">
              <Text className="mx-0 p-0 text-center text-2xl">
                <span className="font-bold tracking-tighter">nratakit</span>
              </Text>
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-medium">
              Verify your email address
            </Heading>
            <Text className="text-[14px] leading-[24px]">Hello {name},</Text>
            <Text className="text-[14px] leading-[24px]">
              Thank you for signing up for nratakit! To complete your
              registration, please verify your email address by clicking the
              button below:
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-full bg-[#000000] px-5 py-3 text-[12px] font-semibold text-white no-underline"
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Verify Email Address
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:
            </Text>
            <Link
              href={url}
              target="_blank"
              className="text-[14px] leading-[24px] break-all"
              rel="noopener noreferrer" // Security enhancement
            >
              {url}
            </Link>
            <Text className="text-[14px] leading-[24px]">
              If you did not sign up, you can safely ignore this email.
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[13px] leading-[24px] text-[#666666]">
              &copy; {new Date().getFullYear()} nratakit. All rights reserved.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
