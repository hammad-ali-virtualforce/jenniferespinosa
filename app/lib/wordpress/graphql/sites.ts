import { fetchGraphQL } from "./graphql";

export interface MediaItem {
  node: {
    id: string;
    sourceUrl: string;
    altText: string;
  } | null;
}

export interface FooterDisclaimer {
  logo: MediaItem | null;
  title: string | null;
  disclaimerText: string | null;
}

export interface SiteSettings {
  branding: {
    siteName: string | null;
    primaryLogo: MediaItem | null;
    lightLogo: MediaItem | null;
    favicon: MediaItem | null;
  } | null;

  header: {
    enableStickyHeader: boolean | null;
    transparentHeader: boolean | null;
    showHeaderBorder: boolean | null;
    headerLogo: MediaItem | null;
    lightLogo: MediaItem | null;
  } | null;

  contact: {
    address: string | null;
    emailAddress: string | null;
    googleMapsUrl: string | null;
    phoneNumber: string | null;
  } | null;

  social: {
    facebookUrl: string | null;
    instagramUrl: string | null;
    linkedinUrl: string | null;
    xTwitterUrl: string | null;
    youtubeUrl: string | null;
  } | null;

  footer: {
    copyrightText: string | null;
    disclaimer: string | null;
    footerDescription: string | null;
    footerLogo: MediaItem | null;
     brokerageLogo: MediaItem | null;
    brokerageDescription: string | null;

    disclaimers: FooterDisclaimer[] | null;
    } | null;
}

interface SiteSettingsResponse {
  siteSettings: SiteSettings | null;
}

const GET_SITE_SETTINGS = `
  query GetSiteSettings {
    siteSettings {
      branding {
        siteName

        primaryLogo {
          node {
            id
            sourceUrl
            altText
          }
        }

        lightLogo {
          node {
            id
            sourceUrl
            altText
          }
        }

        favicon {
          node {
            id
            sourceUrl
            altText
          }
        }
      }

      header {
        enableStickyHeader
        transparentHeader
        showHeaderBorder

        headerLogo {
          node {
            id
            sourceUrl
            altText
          }
        }

        lightLogo {
          node {
            id
            sourceUrl
            altText
          }
        }
      }

      contact {
        address
        emailAddress
        googleMapsUrl
        phoneNumber
      }

      social {
        facebookUrl
        instagramUrl
        linkedinUrl
        xTwitterUrl
        youtubeUrl
      }

      footer {
        copyrightText
        footerDescription
        brokerageDescription
        footerLogo {
          node {
            id
            sourceUrl
            altText
          }
        }

        brokerageLogo {
          node {
            id
            sourceUrl
            altText
          }
        }
          
        disclaimers {
        logo {
            node {
                id
                sourceUrl
                altText
            }
        }

        title
        disclaimerText
        }
      }
    }
  }
`;

export async function getSiteSettings() {
  const data = await fetchGraphQL<SiteSettingsResponse>({
    query: GET_SITE_SETTINGS,
  });

  return data.siteSettings;
}