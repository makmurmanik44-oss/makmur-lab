import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { asset } from "@/config/site";
import { ButtonLink, Container } from "@/components/ui/primitives";

export function LivingCover() {
  return (
    <section className="living-cover" aria-labelledby="cover-title">
      <Image
        className="cover-image"
        src={asset("/covers/port-2026.webp")}
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
      />
      <div className="cover-shade" />
      <Container className="cover-content">
        <div className="cover-edition">
          <span className="cover-dot" /> An open knowledge library{" "}
          <span className="edition-number">VOL. 01 / 2026</span>
        </div>
        <h1 id="cover-title">
          <span>PROCUREMENT.</span>
          <span>STRATEGY.</span>
          <span className="cover-final">
            CONTINUOUS
            <br className="desktop-break" /> LEARNING.
          </span>
        </h1>
        <p className="cover-description">
          A living knowledge library for procurement, supply chain, industrial
          engineering, and continuous learning.
        </p>
        <div className="cover-actions">
          <ButtonLink href="/articles" variant="light">
            Explore Knowledge <ArrowUpRight size={18} aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href="/about" variant="outline">
            About Makmur
          </ButtonLink>
        </div>
        <div className="cover-bottom">
          <a href="#featured" className="scroll-cue">
            <span className="scroll-circle">
              <ArrowDown size={18} aria-hidden="true" />
            </span>
            <span>Open the library</span>
          </a>
          <div className="cover-theme">
            <span>2026 THEME</span>
            <strong>Building Foundations</strong>
          </div>
          <a
            className="cover-credit"
            href="https://unsplash.com/photos/aerial-view-of-a-busy-shipping-port-with-many-containers-JJCrTi0lvTs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Photo: Haris Illahi / Unsplash
          </a>
        </div>
      </Container>
    </section>
  );
}
