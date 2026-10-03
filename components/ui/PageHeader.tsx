import type { ReactNode } from "react";
import SectionHeading from "./SectionHeading";

export default function PageHeader({
  eyebrow,
  title,
  intro,
  action,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className="border-b border-line pb-16 pt-36 md:pb-24 md:pt-48">
      <div className="container-site animate-rise">
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} intro={intro} action={action} />
      </div>
    </section>
  );
}
