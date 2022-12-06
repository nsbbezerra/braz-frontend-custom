import "../styles/globals.css";
import type { AppProps } from "next/app";
import GlobalCartContext from "../context/cart";
import GlobalModalsContext from "../context/modals";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalCartContext>
      <GlobalModalsContext>
        <Component {...pageProps} />
      </GlobalModalsContext>
    </GlobalCartContext>
  );
}

export default MyApp;
