import { fetchGraphQL } from "./graphql";

export interface BlogImage {
  node: {
    id: string;
    sourceUrl: string | null;
    altText: string | null;
  } | null;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  uri: string | null;
}

export interface BlogPost {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  uri: string;
  date: string | null;
  excerpt: string | null;
  content: string | null;

  featuredImage: BlogImage | null;

  categories: {
    nodes: BlogCategory[];
  } | null;

  author: {
    node: {
      name: string | null;
    } | null;
  } | null;
}

/* =========================================
   GET POSTS
========================================= */

interface GetPostsResponse {
  posts: {
    nodes: BlogPost[];
  };
}

const GET_POSTS = `
  query GetPosts($first: Int!) {
    posts(
      first: $first
      where: {
        status: PUBLISH
        orderby: {
          field: DATE
          order: DESC
        }
      }
    ) {
      nodes {
        id
        databaseId
        title
        slug
        uri
        date
        excerpt

        featuredImage {
          node {
            id
            sourceUrl
            altText
          }
        }

        categories {
          nodes {
            id
            name
            slug
            uri
          }
        }

        author {
          node {
            name
          }
        }
      }
    }
  }
`;

export async function getPosts(
  first = 50
): Promise<BlogPost[]> {
  const data =
    await fetchGraphQL<
      GetPostsResponse,
      {
        first: number;
      }
    >({
      query: GET_POSTS,
      variables: {
        first,
      },
    });

  return data.posts.nodes;
}

/* =========================================
   GET SINGLE POST
========================================= */

interface GetPostResponse {
  post: BlogPost | null;
}

const GET_POST = `
  query GetPost($slug: ID!) {
    post(
      id: $slug
      idType: SLUG
    ) {
      id
      databaseId
      title
      slug
      uri
      date
      excerpt
      content

      featuredImage {
        node {
          id
          sourceUrl
          altText
        }
      }

      categories {
        nodes {
          id
          name
          slug
          uri
        }
      }

      author {
        node {
          name
        }
      }
    }
  }
`;

export async function getPost(
  slug: string
): Promise<BlogPost | null> {
  const data =
    await fetchGraphQL<
      GetPostResponse,
      {
        slug: string;
      }
    >({
      query: GET_POST,
      variables: {
        slug,
      },
    });

  return data.post;
}