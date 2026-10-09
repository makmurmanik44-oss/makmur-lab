import { Container } from "@/components/ui/primitives";
import type { EditorialPhoto } from "@/content/editorial-photos";
import { EditorialBackground, PhotoCredit } from "./editorial-background";

export function PageIntro({
  eyebrow,
  title,
  description,
  photo,
}: {
  eyebrow: string;
  title: string;
  description: string;
  photo?: EditorialPhoto;
}) {
  return (
    <section
      className={`page-intro ${photo ? "photo-intro photo-surface" : ""}`}
    >
      {photo && <EditorialBackground photo={photo} priority />}
      <Container>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="intro-copy">{description}</p>
        {photo && <PhotoCredit photo={photo} />}
      </Container>
    </section>
  );
}
