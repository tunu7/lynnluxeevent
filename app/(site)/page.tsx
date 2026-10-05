import Hero from "@/components/sections/Hero";
import ServicesOverview from "@/components/sections/ServicesOverview";
import FeaturedWork from "@/components/sections/FeaturedWork";
import Process from "@/components/sections/Process";
import CtaBand from "@/components/sections/CtaBand";
import { getEvents, getServices } from "@/lib/content";

export default async function HomePage() {
  const [events, services] = await Promise.all([getEvents(), getServices()]);

  return (
    <>
      <Hero feature={events[0]} />
      <ServicesOverview services={services} />
      <FeaturedWork events={events} />
      <Process />
      <CtaBand />
    </>
  );
}
