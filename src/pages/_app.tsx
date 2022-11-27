import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/src/store/store";
import { SkeletonTheme } from "react-loading-skeleton";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      <SkeletonTheme baseColor="#313131" highlightColor="#525252">
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </SkeletonTheme>
    </>
  );
}

export default MyApp;
