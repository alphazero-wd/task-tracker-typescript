import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = JSON.parse(localStorage.getItem("token") as string);
  // return the headers to the context so httpLink can read them
  if (token) {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    };
  }
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});
