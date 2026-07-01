import Hero from "../components/landing/Hero";
import AudienceHighlights from "../components/landing/AudienceHighlights";
import ServicesPreview from "../components/landing/ServicesPreview";
import TestimonialSlider from "../components/testimonials/TestimonialSlider";
import CTASection from "../components/landing/CTASection";

export default function LandingPage() {
  return (
    <div>
      <Hero />
      <AudienceHighlights />
      <ServicesPreview />
      <TestimonialSlider />
      <CTASection />
    </div>
  );
}
