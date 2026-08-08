import { SiteHeader } from "./_components/site-header";
import { Hero } from "./_components/hero";
import { OasisSection } from "./_components/sections/oasis-section";
import { ExperienceSection } from "./_components/sections/experience-section";
import { NeighborhoodSection } from "./_components/sections/neighborhood-section";
import { ConciergeSection } from "./_components/sections/concierge-section";
import { GuideSection } from "./_components/sections/guide-section";
import { ReviewsSection } from "./_components/sections/reviews-section";
import { ContactSection } from "./_components/sections/contact-section";
import { SiteFooter } from "./_components/site-footer";
import { FloatingBookingBar } from "./_components/booking-widget/floating-booking-bar";

export default function ZoPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <OasisSection />
        <ExperienceSection />
        <NeighborhoodSection />
        <ConciergeSection />
        <GuideSection />
        <ReviewsSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <FloatingBookingBar />
    </>
  );
}
