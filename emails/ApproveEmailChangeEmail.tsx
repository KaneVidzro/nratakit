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
  pixelBasedPreset,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

interface Props {
  name: string;
  url: string;
  newEmail: string;
}

export const ApproveEmailChangeEmail = ({ name, url, newEmail }: Props) => (
  <Html>
    <Head />
    <Tailwind config={{ presets: [pixelBasedPreset] }}>
      <Body className="mx-auto my-auto bg-white px-2 font-sans">
        <Preview>Approve your email change request</Preview>
        <Container className="mx-auto my-[40px] max-w-[465px] p-[20px]">
          <Heading className="mx-0 my-[30px] p-0 text-center font-bold text-[24px] text-black">
            Confirm your email change
          </Heading>
          <Text className="text-[14px] text-black leading-[24px]">
            Hello {name},
          </Text>
          <Text className="text-[14px] text-black leading-[24px]">
            You requested to change your account email to{" "}
            <strong>{newEmail}</strong>. Please confirm this change by clicking
            the button below.
          </Text>
          <Section className="mt-[32px] mb-[32px] text-center">
            <Button
              aria-label="Approve email change"
              className="rounded bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
              href={url}
            >
              Approve Change
            </Button>
          </Section>
          <Text className="break-words text-[14px] text-black leading-[24px]">
            Or copy and paste this URL into your browser:{" "}
            <Link href={url} className="text-blue-600 no-underline">
              {url}
            </Link>
          </Text>
          <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
          <Text className="text-[#999999] text-[13px] leading-[20px] mt-4">
            If you did not request this change, please ignore this email or{" "}
            <Link
              href="mailto:support@nrata.lol"
              className="text-blue-600 no-underline"
            >
              contact our support team
            </Link>
            .
          </Text>
          <Text className="text-[#999999] text-[12px] leading-[20px] mt-6 text-center">
            © {new Date().getFullYear()} nrataKit. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default ApproveEmailChangeEmail;
