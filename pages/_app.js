import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "../utils/auth";
import Head from "next/head";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </Head>
      <AuthProvider>
        <Layout>
        <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </>
  );
}

export default MyApp;
