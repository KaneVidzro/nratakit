import React from "react";
import { Container } from "@/components/widgets/container";

export default function HomePage() {
  return (
    <section className="bg-blue-100">
      <Container>
        <h1 className="text-3xl font-bold">nrataKit</h1>
        <p className="text-muted-foreground">
          nrataKit is a Next.js 13 app template with Tailwind CSS, React,
          TypeScript, Prisma, and more.
        </p>
      </Container>
    </section>
  );
}
