import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import JsonLd from "@/components/ui/JsonLd";
import { site } from "@/lib/site";
import { contactLinks, getSiteContent } from "@/lib/site-content";
import type { SiteContent } from "@/lib/site-content-schema";
import { absoluteUrl } from "@/lib/seo";

const home = absoluteUrl("/");

const structuredData = ({ brand, contact }: SiteContent) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${home}#organization`,
      name: brand.name,
      alternateName: brand.shortName,
      slogan: brand.tagline,
      description: brand.description,
      url: home,
      image: absoluteUrl("/opengraph-image"),
      ...(brand.logo ? { logo: brand.logo } : {}),
      telephone: contact.phone,
      sameAs: contact.instagramUrl ? [contact.instagramUrl] : [],
      areaServed: { "@type": "State", name: contact.region },
      address: {
        "@type": "PostalAddress",
        addressLocality: contact.locality,
        addressRegion: contact.region,
        addressCountry: site.contact.country,
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: contact.phone,
        contactType: "customer service",
      },
      knowsAbout: [
        "Event planning",
        "Wedding planning",
        "Event décor and styling",
        "Birthday parties",
        "Corporate events",
        "Event catering",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${home}#website`,
      name: brand.name,
      url: home,
      inLanguage: "en-IN",
      publisher: { "@id": `${home}#organization` },
    },
  ],
});

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const content = await getSiteContent();

  return (
    <>
      <SiteHeader brand={content.brand} nav={content.nav} contact={content.contact} tel={contactLinks(content).tel} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <JsonLd data={structuredData(content)} />
    </>
  );
}
