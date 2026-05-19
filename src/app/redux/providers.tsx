"use client";

import { Provider } from "react-redux";
import { store } from "../redux/store";
import { ApolloProvider}  from "@apollo/client/react";
import { client } from "@/lib/apollo-client"; 

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        {children}
      </Provider>
    </ApolloProvider>
  );
}