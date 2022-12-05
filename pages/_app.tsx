import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "urql";
import { clientQuery } from "../lib/urql";
import GlobalCartContext from "../context/cart";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={clientQuery}>
      <GlobalCartContext>
        <Component {...pageProps} />
      </GlobalCartContext>
    </Provider>
  );
}

export default MyApp;
