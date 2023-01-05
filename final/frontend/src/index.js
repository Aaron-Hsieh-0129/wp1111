import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { DisplayProvider } from "./containers/hooks/useDisplay";
import App from "./App";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  HttpLink
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { BrowserRouter } from "react-router-dom";

// const client = new ApolloClient({
//   uri: 'http://localhost:4010/graphql',
//   cache: new InMemoryCache(),
// })

const httpURI = process.env.NODE_ENV === "production" 
                ? "/graphql" 
                : "http://localhost:4010/graphql";

const WS_URL = process.env.NODE_ENV === "production" 
                ? window.location.origin.replace(/^http/, "ws") 
                : "ws://localhost:4010/graphql";

// Create an http link:
const httpLink = new HttpLink({
    // uri: 'http://localhost:4010/graphql',
    uri: {httpURI}
});

// Create a WebSocket link:
const wsLink = new GraphQLWsLink(createClient({
    // url: 'ws://localhost:4010/graphql',
    url: {WS_URL},
    options: { reconnect: true },
}));

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
    // split based on operation type
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <DisplayProvider>
                    <App />
            </DisplayProvider>
        </ApolloProvider>
    </React.StrictMode>
);
