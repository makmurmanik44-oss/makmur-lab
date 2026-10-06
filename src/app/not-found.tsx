import { Container, ButtonLink } from "@/components/ui/primitives";
export default function NotFound() {
  return (
    <section className="not-found">
      <Container>
        <p className="eyebrow">404 / Missing page</p>
        <h1>This shelf is empty.</h1>
        <p>The page may have moved or the link may be incorrect.</p>
        <ButtonLink href="/articles">Explore Knowledge</ButtonLink>
      </Container>
    </section>
  );
}
