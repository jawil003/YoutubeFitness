/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";
import { buildAxiosFetch } from "@lifeomic/axios-fetch";
import axios from "axios";
import { createHttpLink } from "apollo-link-http";

const localLink = createHttpLink({
  uri: `${
    process.env.HOST ||
    "http://localhost:3000"
  }/api/graphql`,
  fetch: buildAxiosFetch(
    axios as any,
  ) as any,
});

export const localClient = new ApolloClient(
  {
    link: localLink as any,
    cache: new InMemoryCache(),
  },
);
