import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
//  const token=sessionStorage.getItem("access_token")
// const client = new ApolloClient({
//   uri: "http://127.0.0.1:8000/graphql",
//   headers: {
//     lang: "en",
//     Authorization: `Bearer ${token}`
//   },
//   cache: new InMemoryCache(),
// });
// import ApolloClient from "apollo-client";
// import { HttpLink } from "apollo-link-http";
// import { ApolloLink, concat, split } from "apollo-link";
// // import { InMemoryCache } from "apollo-cache-inmemory";
// import { getMainDefinition } from "apollo-utilities";

// const httpLink = new HttpLink({ uri: "http://127.0.0.1:8000/graphql" });

// const authMiddleware = new ApolloLink((operation, forward) => {
//   // add the authorization to the headers
// const token = localStorage.getItem('access_token');
//   operation.setContext({
//     headers: {
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   });
//   return forward(operation);
// });
// export const apolloClient = new ApolloClient({
//   link: concat(authMiddleware, httpLink),
//   cache: new InMemoryCache(),
// });
import {  createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://127.0.0.1:8000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = sessionStorage.getItem('access_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      lang:"en"
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
