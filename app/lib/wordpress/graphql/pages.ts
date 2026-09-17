import { fetchGraphQL } from "./graphql";
import type { Area } from "./areas";
export interface AcfImage {
  node: {
    id: string;
    sourceUrl: string | null;
    altText: string | null;
  } | null;
}

export interface AcfVideo {
  node: {
    id: string;
    mediaItemUrl: string | null;
  } | null;
}

export interface HeroMediaItem {
  mediaType: "image" | "video" | null;
  image: AcfImage | null;
  video: AcfVideo | null;
  videoPoster: AcfImage | null;
}

export interface HeroExploreLink {
  title: string | null;
  link: string | null;
  eyebrow: string | null;
}

export interface HeroSectionData {
  __typename: "PageSectionsPageSectionsHeroLayout";

  heroMedia: HeroMediaItem[] | null;

  heading: string | null;
  description: string | null;

  primaryButtonText: string | null;
  primaryButtonLink: string | null;

  secondaryButtonText: string | null;
  secondaryButtonLink: string | null;

  exploreLinks: HeroExploreLink[] | null;
}


export interface ContentMediaStat {
  value: string | null;
  label: string | null;
}

export interface ContentMediaSectionData {
  __typename: "PageSectionsPageSectionsContentMediaLayout";

  image: AcfImage | null;
  imagePosition: "left" | "right" | null;

  heading: string | null;
  description: string | null;

  stats: ContentMediaStat[] | null;

  buttonText: string | null;
  buttonUrl: string | null;

  backgroundColor: string | null;
}


export interface CtaSectionData {
  __typename: "PageSectionsPageSectionsCtaLayout";

  eyebrow: string | null;
  heading: string | null;
  description: string | null;

  buttonText: string | null;
  buttonLink: string | null;

  image: AcfImage | null;
  imagePosition: "left" | "right" | null;

  layoutStyle:
    | "card"
    | "fullWidth"
    | "minimal"
    | null;

  sectionBackground: string | null;
  cardBackground: string | null;
  cardShadow: boolean | null;
}

export interface FeaturedAreasSectionData {
  __typename: "PageSectionsPageSectionsFeaturedAreasLayout";

  eyebrow: string | null;
  heading: string | null;
  description: string | null;
  backgroundColor: string | null;

  areas: {
    nodes: Area[];
  } | null;
}

export interface FeaturedListingsSectionData {
  __typename:
    "PageSectionsPageSectionsFeaturedListingsLayout";

  eyebrow: string | null;
  heading: string | null;
  description: string | null;

  numberOfListings: number | null;

  buttonText: string | null;
  buttonLink: string | null;

  backgroundColor: string | null;
}

export interface BuyingOrSellingSlide {
  backgroundImage: AcfImage | null;
  eyebrow: string | null;
  heading: string | null;
  description: string | null;
  buttonText: string | null;
  buttonLink: string | null;
  contentPosition: "left" | "right" | null;
}

export interface BuyingOrSellingSectionData {
  __typename: "PageSectionsPageSectionsBuyingOrSellingLayout";
  backgroundImage: AcfImage | null;
  heading: string | null;
  sliderItems: BuyingOrSellingSlide[] | null;
}

export interface ContactSectionData {
  __typename: "PageSectionsPageSectionsContactSectionLayout";

  image: AcfImage | null;

  eyebrow: string | null;
  heading: string | null;
  description: string | null;

  buttonText: string | null;
  backgroundColor: string | null;

  showForm: boolean | null;
  showMap: string | null;
}

export interface PageHeroSectionData {
  __typename: "PageSectionsPageSectionsPageHeroLayout";

  eyebrow: string | null;
  heading: string | null;
  description: string | null;

  backgroundImage: AcfImage | null;

  alignment: "left" | "center" | null;

  overlayOpacity: number | string | null;
}

export interface SeamlessExperienceItem {
  icon: string | null;
  title: string | null;
  description: string | null;
}

export interface SeamlessExperienceSectionData {
  __typename: "PageSectionsPageSectionsSeamlessExperienceLayout";

  eyebrow: string | null;
  heading: string | null;
  description: string | null;

  backgroundImage: AcfImage | null;
  backgroundColor: string | null;
  textColor: string | null;
  overlayOpacity: number | string | null;

  items: SeamlessExperienceItem[] | null;
}

export type PageSection =
  | HeroSectionData
  | PageHeroSectionData
  | ContentMediaSectionData
  | CtaSectionData
  | FeaturedAreasSectionData
  | FeaturedListingsSectionData
  | BuyingOrSellingSectionData
  | ContactSectionData
  | SeamlessExperienceSectionData
  | {
      __typename: string;
    };

export interface WordPressPage {
  id: string;
  title: string;
  uri: string;

  pageSections: {
    pageSections: PageSection[] | null;
  } | null;
}

interface GetPageResponse {
  nodeByUri: WordPressPage | null;
}

const GET_PAGE = `
  query GetPage($uri: String!) {
    nodeByUri(uri: $uri) {
      ... on Page {
        id
        title
        uri

        pageSections {
          pageSections {
            __typename

            ... on PageSectionsPageSectionsHeroLayout {
              heroMedia {
                mediaType

                image {
                  node {
                    id
                    sourceUrl
                    altText
                  }
                }

                video {
                  node {
                    id
                    mediaItemUrl
                  }
                }

                videoPoster {
                  node {
                    id
                    sourceUrl
                    altText
                  }
                }
              }

              heading
              description

              primaryButtonText
              primaryButtonLink

              secondaryButtonText
              secondaryButtonLink

              exploreLinks {
                title
                link

                eyebrow
              }
            }
            ... on PageSectionsPageSectionsPageHeroLayout {
              eyebrow
              heading
              description
              alignment
              overlayOpacity

              backgroundImage {
                node {
                  id
                  sourceUrl
                  altText
                }
              }
            }
            ... on PageSectionsPageSectionsContentMediaLayout {
            image {
                node {
                id
                sourceUrl
                altText
                }
            }

            imagePosition

            heading
            description

            stats {
                value
                label
            }

            buttonText
            buttonUrl
            backgroundColor
            }
          ... on PageSectionsPageSectionsCtaLayout {
            eyebrow
            heading
            description

            buttonText
            buttonLink

            image {
                node {
                id
                sourceUrl
                altText
                }
            }

            imagePosition
            layoutStyle
            sectionBackground
            cardBackground
            cardShadow
          }
          ... on PageSectionsPageSectionsFeaturedAreasLayout {
            eyebrow
            heading
            description
            backgroundColor

            areas {
              nodes {
                __typename

                ... on Area {
                  id
                  databaseId
                  title
                  slug
                  uri
                  content

                  featuredImage {
                    node {
                      id
                      sourceUrl
                      altText
                    }
                  }
                }
              }
            }
          }  
          ... on PageSectionsPageSectionsFeaturedListingsLayout {
            eyebrow
            heading
            description
            numberOfListings
            buttonText
            buttonLink
            backgroundColor
          }
          ... on PageSectionsPageSectionsBuyingOrSellingLayout {
            heading

            backgroundImage {
              node {
                id
                sourceUrl
                altText
              }
            }

            sliderItems {
              backgroundImage {
                node {
                  id
                  sourceUrl
                  altText
                }
              }

              eyebrow
              heading
              description
              buttonText
              buttonLink
              contentPosition
            }
          }
          ... on PageSectionsPageSectionsContactSectionLayout {
            image {
              node {
                id
                sourceUrl
                altText
              }
            }

            eyebrow
            heading
            description
            buttonText
            backgroundColor
            showForm
            showMap
          }
          ... on PageSectionsPageSectionsSeamlessExperienceLayout {
            eyebrow
            heading
            description
            backgroundColor
            textColor
            overlayOpacity

            backgroundImage {
              node {
                id
                sourceUrl
                altText
              }
            }

            items {
              icon
              title
              description
            }
          }
          }
        }        
      }
    }
  }
`;

export async function getPage(uri: string) {
  const data = await fetchGraphQL<GetPageResponse>({
    query: GET_PAGE,
    variables: {
      uri,
    },
  });

  return data.nodeByUri;
}