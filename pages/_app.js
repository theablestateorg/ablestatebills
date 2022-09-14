import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "../utils/auth";
import Head from "next/head";
import Layout from "../components/Layout";
import Navbar from "../components/nav";
import React from "react";

function MyApp({ Component, pageProps, ...appProps }) {
  const isLayoutNeeded = ["/login", "/register", "/forgot-password"].includes(appProps.router.pathname);

  const LayoutComponent = isLayoutNeeded ? React.Fragment : Layout;
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </Head>
      <AuthProvider>
        <LayoutComponent>
          <Component {...pageProps} />
        </LayoutComponent>
      </AuthProvider>
    </>
  );
}

export default MyApp;
