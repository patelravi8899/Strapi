import "../styles/globals.css";
import "../styles/custom.css";
import type { AppProps } from "next/app";
import { Fragment } from "react";
import Header from "../Components/Header";
import { wrapper } from "../Redux/Store/store";
import { Provider } from "react-redux";
import Head from "next/head";
import Footer from "../Components/Footer";

 function App({ Component, ...pageProps }: AppProps) {
  <Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/></Head>

  // const { store, props } = wrapper.useWrappedStore(rest);
  // const { emotionCache , pageProps } = props;
  return (
    <Fragment>

      {/* <Provider store={store}> */}

      <Header />
      <Component {...pageProps} />
      <Footer />
      {/* </Provider> */}
    </Fragment>
  );
}

export default wrapper.withRedux(App)
