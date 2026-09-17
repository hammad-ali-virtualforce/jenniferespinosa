import { fetchGraphQL } from "./graphql";

export interface AreaImage {
  node: {
    id: string;
    sourceUrl: string | null;
    altText: string | null;
  } | null;
}

export interface Area {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  uri: string;
  content: string | null;
  featuredImage: AreaImage | null;
}

interface GetAreaResponse {
  nodeByUri: Area | null;
}

interface GetAreasResponse {
  areas: {
    nodes: Area[];
  };
}

const GET_AREA = `
  query GetArea($uri: String!) {
    nodeByUri(uri: $uri) {
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
`;

const GET_AREAS = `
  query GetAreas {
    areas(first: 50) {
      nodes {
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
`;

export async function getArea(slug: string) {
  const data = await fetchGraphQL<GetAreaResponse>({
    query: GET_AREA,
    variables: {
      uri: `/area/${slug}/`,
    },
  });

  return data.nodeByUri;
}

export async function getAreas() {
  const data = await fetchGraphQL<GetAreasResponse>({
    query: GET_AREAS,
  });

  return data.areas.nodes;
}