import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import JsonLd from "@/components/ui/JsonLd";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";

const home = absoluteUrl("/");

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${home}#organization`,
      name: site.name,
      alternateName: site.shortName,
      slogan: site.tagline,
      description: site.description,
      url: home,
      image: absoluteUrl("/opengraph-image"),
      telephone: site.contact.phone,
      sameAs: [site.contact.instagram],
      areaServed: { "@type": "State", name: site.contact.region },
      address: {
        "@type": "PostalAddress",
        addressLocality: site.contact.locality,
        addressRegion: site.contact.region,
        addressCountry: site.contact.country,
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: site.contact.phone,
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
      name: site.name,
      url: home,
      inLanguage: "en-IN",
      publisher: { "@id": `${home}#organization` },
    },
  ],
};

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <JsonLd data={structuredData} />
    </>
  );
}
