import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

export const { getClient: getApolloClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT,
      headers: {
        "x-hasura-admin-secret":
          process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ADMIN_SECRET,
      },
    }),
  });
});
