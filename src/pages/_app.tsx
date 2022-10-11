import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/src/store/store";

import {
  createClient,
  configureChains,
  defaultChains,
  WagmiConfig,
} from "wagmi";

import { publicProvider } from "wagmi/providers/public";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

const { provider, webSocketProvider } = configureChains(defaultChains, [
  publicProvider(),
]);

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
});

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  return (
    <>
      <WagmiConfig client={client}>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </SessionProvider>
      </WagmiConfig>
    </>
  );
}

export default MyApp;
