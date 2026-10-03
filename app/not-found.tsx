import ButtonLink from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center pb-20 pt-36">
      <div className="container-site">
        <p className="eyebrow text-accent">Page not found</p>
        <h1 className="mt-5 max-w-3xl text-5xl leading-[1.02] md:text-7xl">This page has left the party.</h1>
        <p className="mt-6 max-w-md text-lg text-muted">
          The link may be out of date. Let&apos;s get you back to something beautiful.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/">Back home</ButtonLink>
          <ButtonLink href="/portfolio" variant="secondary" arrow={false}>
            View portfolio
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
