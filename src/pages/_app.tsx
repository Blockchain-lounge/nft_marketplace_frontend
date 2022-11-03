import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/src/store/store";
import { SkeletonTheme } from "react-loading-skeleton";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SkeletonTheme baseColor="#313131" highlightColor="#525252">
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </SkeletonTheme>
    </>
  );
}

export default MyApp;
