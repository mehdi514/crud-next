import "../styles/globals.css";
//theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../theme/ihp-theme.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>CRUD App</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
