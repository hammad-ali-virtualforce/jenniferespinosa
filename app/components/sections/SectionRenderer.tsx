import HeroSection from "./HeroSection";
import ContentMediaSection from "./ContentMediaSection";
import CtaSection from "./CtaSection";
import FeaturedAreasSection from "./FeaturedAreasSection";
import FeaturedListingsSection from "./FeaturedListingsSection";
import BuyingOrSellingSection from "./BuyingOrSellingSection";
import ContactSection from "./ContactSection";
import PageHeroSection from "./PageHeroSection";
import SeamlessExperienceSection from "./SeamlessExperienceSection";

import type {
  PageSection,
  HeroSectionData,
  PageHeroSectionData,
  ContentMediaSectionData,
  CtaSectionData,
  FeaturedAreasSectionData,
  FeaturedListingsSectionData,
  BuyingOrSellingSectionData,
  ContactSectionData,
  SeamlessExperienceSectionData,
} from "@/app/lib/wordpress/graphql/pages";

interface SectionRendererProps {
  sections: PageSection[] | null | undefined;

  siteSettings?: {
    contact?: {
      address?: string | null;
      emailAddress?: string | null;
      googleMapsUrl?: string | null;
      phoneNumber?: string | null;
    } | null;

    social?: {
      facebookUrl?: string | null;
      instagramUrl?: string | null;
      linkedinUrl?: string | null;
      xTwitterUrl?: string | null;
      youtubeUrl?: string | null;
    } | null;
  } | null;
}



export default function SectionRenderer({
  sections,
  siteSettings,
}: SectionRendererProps)  {
  if (!sections?.length) {
    return null;
  }

  const wordpressUrl =
    process.env.WORDPRESS_URL || "";

  return (
    <>
      {sections.map(
        (section, index) => {
          switch (
            section.__typename
          ) {
            case "PageSectionsPageSectionsHeroLayout":
              return (
                <HeroSection
                  key={index}
                  data={
                    section as HeroSectionData
                  }
                  wordpressUrl={
                    wordpressUrl
                  }
                />
              );
            case "PageSectionsPageSectionsPageHeroLayout":
              return (
                <PageHeroSection
                  key={index}
                  data={
                    section as PageHeroSectionData
                  }
                />
              );
            case "PageSectionsPageSectionsContentMediaLayout":
                return (
                    <ContentMediaSection
                    key={index}
                    data={
                        section as ContentMediaSectionData
                    }
                    wordpressUrl={wordpressUrl}
                    />
                );
            case "PageSectionsPageSectionsCtaLayout":
                return (
                    <CtaSection
                    key={index}
                    data={section as CtaSectionData}
                    wordpressUrl={wordpressUrl}
                    />
                );
            case "PageSectionsPageSectionsFeaturedAreasLayout":
                return (
                  <FeaturedAreasSection
                    key={index}
                    data={
                      section as FeaturedAreasSectionData
                    }
                  />
                );
            case "PageSectionsPageSectionsFeaturedListingsLayout":
              return (
                <FeaturedListingsSection
                  key={index}
                  data={
                    section as FeaturedListingsSectionData
                  }
                />
              );
            case "PageSectionsPageSectionsBuyingOrSellingLayout":
              return (
                <BuyingOrSellingSection
                  key={index}
                  data={
                    section as BuyingOrSellingSectionData
                  }
                  wordpressUrl={wordpressUrl}
                />
              );
            case "PageSectionsPageSectionsContactSectionLayout":
              return (
                <ContactSection
                  key={index}
                  data={section as ContactSectionData}
                  contact={siteSettings?.contact}
                  social={siteSettings?.social}
                />
              );
            case "PageSectionsPageSectionsSeamlessExperienceLayout":
              return (
                <SeamlessExperienceSection
                  key={index}
                  data={
                    section as SeamlessExperienceSectionData
                  }
                />
              );
            default:
              return null;
          }
        }
      )}
    </>
  );
}