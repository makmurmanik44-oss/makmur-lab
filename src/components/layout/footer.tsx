import Link from "next/link";
import { BookOpen, ArrowUpRight } from "lucide-react";
import { navigation, site } from "@/config/site";
import { Container } from "@/components/ui/primitives";

export function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-top">
          <div>
            <Link prefetch={false} href="/" className="brand">
              <BookOpen size={24} aria-hidden="true" /> Makmur Lab
            </Link>
            <p className="footer-motto">{site.motto}</p>
            <p className="footer-description">
              Knowledge over attention.
              <br />A library that grows through learning.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            {navigation
              .filter((item) => item.href !== "/")
              .map((item) => (
                <Link prefetch={false} href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
            <Link prefetch={false} href="/review">
              Content review
            </Link>
            <Link prefetch={false} href="/saved">
              Saved notes
            </Link>
          </nav>
          <div>
            <p className="eyebrow">Curated by Makmur</p>
            <a
              className="text-link"
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect on LinkedIn <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <p className="footer-description">
              Procurement. Strategy.
              <br />
              Continuous Learning.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Makmur Lab</span>
          <span>Alpha · Building Foundations</span>
          <span>Knowledge is always revisable.</span>
        </div>
      </Container>
    </footer>
  );
}
