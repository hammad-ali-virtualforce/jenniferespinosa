interface GraphQLRequest<TVariables = Record<string, unknown>> {
  query: string;
  variables?: TVariables;
}

export async function fetchGraphQL<
  TData,
  TVariables = Record<string, unknown>
>({
  query,
  variables,
}: GraphQLRequest<TVariables>): Promise<TData> {
  const endpoint = process.env.WORDPRESS_GRAPHQL_URL;

  if (!endpoint) {
    throw new Error(
      "WORDPRESS_GRAPHQL_URL is not defined in .env.local"
    );
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `GraphQL request failed: ${response.status} ${response.statusText}`
    );
  }

  const result = await response.json();

  if (result.errors) {
    console.error("GraphQL errors:", result.errors);

    throw new Error(
      result.errors
        .map((error: { message: string }) => error.message)
        .join("\n")
    );
  }

  return result.data;
}