import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import JsonLd from "@/components/ui/JsonLd";
import { site } from "@/lib/site";

const organization = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: site.contact.phone,
  sameAs: [site.contact.instagram],
  areaServed: { "@type": "State", name: site.contact.region },
  address: {
    "@type": "PostalAddress",
    addressLocality: site.contact.locality,
    addressRegion: site.contact.region,
    addressCountry: site.contact.country,
  },
};

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <JsonLd data={organization} />
    </>
  );
}
