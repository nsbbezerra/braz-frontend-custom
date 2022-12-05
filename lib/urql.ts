import {
  cacheExchange,
  createClient,
  dedupExchange,
  fetchExchange,
  ssrExchange,
} from "urql";

const url = process.env.NEXT_PUBLIC_API_URL || "";
const queryToken = process.env.NEXT_PUBLIC_QUERY_TOKEN;
const mutationToken = process.env.NEXT_PUBLIC_MUTATION_TOKEN;

const isServerSide = typeof window === "undefined";
const ssrCache = ssrExchange({ isClient: !isServerSide });

const clientQuery = createClient({
  url,
  exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
  requestPolicy: "network-only",
  fetchOptions: {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${queryToken}`,
    },
  },
});

const clientMutation = createClient({
  url: url,
  exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
  requestPolicy: "network-only",
  fetchOptions: {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${mutationToken}`,
    },
  },
});

export { clientQuery, ssrCache, clientMutation };
