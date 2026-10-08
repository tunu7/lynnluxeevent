import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageTitle from "@/components/admin/PageTitle";
import ContentEditor from "@/components/admin/ContentEditor";
import SubmitButton from "@/components/admin/SubmitButton";
import { buttons } from "@/components/admin/styles";
import { requireAdmin } from "@/lib/auth";
import { readSiteContent } from "@/lib/site-content";
import { sections } from "@/lib/site-content-schema";
import { resetContentSection } from "./actions";

export const metadata: Metadata = { title: "Website content" };

/** Where each section can be seen on the live site. */
const previews: Record<string, string> = {
  home: "/",
  process: "/",
  faq: "/",
  cta: "/",
  about: "/about",
  servicesPage: "/services",
  portfolioPage: "/portfolio",
  contactPage: "/contact",
  inquirePage: "/inquire",
};

export default async function ContentPage({ searchParams }: PageProps<"/admin/content">) {
  await requireAdmin();
  const params = await searchParams;
  const section = sections.find((s) => s.id === params.section) ?? sections[0];
  const content = await readSiteContent();
  const groups = [...new Set(sections.map((s) => s.group))];

  return (
    <>
      <PageTitle
        title="Website content"
        description="Edit the text, menu, logo and contact details on your website. Changes go live as soon as you save."
        action={
          <a href={previews[section.id] ?? "/"} target="_blank" rel="noopener noreferrer" className={buttons.secondary}>
            View on site
            <ArrowUpRight aria-hidden size={15} />
          </a>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[14rem_1fr]">
        <nav aria-label="Content sections" className="lg:sticky lg:top-6 lg:self-start">
          {groups.map((group) => (
            <div key={group} className="mb-4">
              <p className="mb-1.5 px-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted">{group}</p>
              <ul className="flex gap-1 overflow-x-auto lg:flex-col">
                {sections
                  .filter((s) => s.group === group)
                  .map((s) => (
                    <li key={s.id} className="shrink-0">
                      <Link
                        href={`/admin/content?section=${s.id}`}
                        aria-current={s.id === section.id ? "page" : undefined}
                        className="block rounded-sm px-3 py-2 text-sm text-ink-2 hover:bg-ink/5 aria-[current=page]:bg-ink aria-[current=page]:text-paper"
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="min-w-0">
          <div className="mb-5">
            <h2 className="text-2xl">{section.title}</h2>
            <p className="mt-1 text-sm text-muted">{section.description}</p>
          </div>
          {/* Keyed on the saved values so switching sections or restoring resets the form. */}
          <ContentEditor
            key={`${section.id}:${JSON.stringify(content[section.id])}`}
            section={section}
            initial={content[section.id] as Record<string, unknown>}
          />
          <form action={resetContentSection.bind(null, section.id)} className="mt-6 text-right">
            <SubmitButton
              variant="ghost"
              pendingLabel="Restoring…"
              confirm={`Restore the original ${section.title.toLowerCase()} content? Your edits to this section will be lost.`}
            >
              Restore original text
            </SubmitButton>
          </form>
        </div>
      </div>
    </>
  );
}
