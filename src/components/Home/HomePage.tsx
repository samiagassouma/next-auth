import FeaturedCompaniesSection from "./FeaturedCompaniesSection";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import HowItWorksSection from "./HowItWorksSection";
import Navbar from "./Navbar";
import PopularDomainsSection from "./PopularDomainsSection";
import PositionsSection from "./PositionsSection";
import PromoBanner from "./PromoBanner";
import TestimonialsSection from "./TestimonialsSection";
import TrustedCompaniesSection from "./TrustedCompaniesSection";
import {
  domains,
  featuredCompanies,
  featuredPositions,
  heroContent,
  hotPositions,
  latestPositions,
  navbarActions,
  navbarItems,
  promoStats,
  sectionTitles,
  testimonials,
  trustedLogos,
  workSteps,
} from "./home-data";

export default function HomePage() {
  return (
    <main className="bg-white max-w-7xl mx-auto">
      <Navbar
        actions={navbarActions}
        items={navbarItems}
        logoAlt="JobPilot logo"
        logoSrc="/logo.png"
      />

      <HeroSection
        highlight={heroContent.highlight}
        imageAlt={heroContent.imageAlt}
        imageSrc={heroContent.imageSrc}
        searchPlaceholder={heroContent.searchPlaceholder}
        subtitle={heroContent.subtitle}
        title={heroContent.title}
      />

      <PositionsSection
        id="featured-positions"
        positions={featuredPositions}
        title={sectionTitles.featured}
        highlight="Featured"
        actionHref="/positions"
        actionLabel="Show all positions"
      />

      <PromoBanner
        ctaHref="/signup"
        ctaLabel="Sign Up For Free"
        stats={promoStats}
        title="Get more features and stats by signing up"
      />

      <PositionsSection
        id="hot-positions"
        positions={hotPositions}
        title={sectionTitles.hot}
        highlight="Hot"
        actionHref="/positions?filter=hot"
        actionLabel="Show all hot positions"
      />

      <PopularDomainsSection
        domains={domains}
        highlight="Domains"
        title={sectionTitles.domains}
      />

      <PositionsSection
        highlight="Open"
        id="latest-positions"
        positions={latestPositions}
        title={sectionTitles.latest}
        actionHref="/positions?filter=latest"
        actionLabel="Show all positions"
      />

      <TrustedCompaniesSection
        logos={trustedLogos}
        subtitle="Join teams that discover, compare, and hire through JobPilot every week."
        title={sectionTitles.trusted}
        highlight="Trust"
      />

      <HowItWorksSection steps={workSteps} title={sectionTitles.howItWorks} />

      <FeaturedCompaniesSection
        companies={featuredCompanies}
        highlight="Companies"
        title={sectionTitles.companies}
      />

      <TestimonialsSection
        testimonials={testimonials}
        title={sectionTitles.testimonials}
      />

      <Footer />
    </main>
  );
}
