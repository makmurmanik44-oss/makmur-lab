import type { Metadata } from "next";
import { PageIntro } from "@/components/common/page-intro";
import { Container } from "@/components/ui/primitives";
import { Discovery } from "@/components/knowledge/discovery";
export const metadata: Metadata = {
  title: "Knowledge",
  alternates: { canonical: "./articles/" },
};
export default function Articles() {
  return (
    <>
      <PageIntro
        eyebrow="The knowledge library"
        title="Explore ideas. Develop your understanding."
        description="Learning notes with explicit status, practical examples, and visible revisions. This Alpha collection is a starting point, not a finished reference library."
      />
      <section className="page-content">
        <Container>
          <Discovery />
        </Container>
      </section>
    </>
  );
}
