import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "../utils/auth";
import Layout from "../components/Layout";
import React from "react";
import ProgressBar from "../components/ProgressBar";
import { useRouter } from "next/router";
import { useEffect } from "react";
import NProgress from "nprogress";
import "../styles/Progress.css";
import { CookiesProvider } from "react-cookie"

function MyApp({ Component, pageProps, ...appProps }) {
  const isLayoutNeeded = [
    "/login",
    "/register",
    "/forgot-password",
    "/packages/[id]/[go]",
    "/404",
    "/500",
  ].includes(appProps.router.pathname);

  const LayoutComponent = isLayoutNeeded ? React.Fragment : Layout;

  const router = useRouter();

  useEffect(() => {
    // const handleStart = (url) => {
    //   NProgress.start();
    // };
    // const handleStop = () => {
    //   NProgress.done();
    // };
    // router.events.on("routeChangeStart", handleStart);
    // router.events.on("routeChangeComplete", handleStop);
    // router.events.on("routeChangeError", handleStop);
    // return () => {
    //   router.events.off("routeChangeStart", handleStart);
    //   router.events.off("routeChangeComplete", handleStop);
    //   router.events.off("routeChangeError", handleStop);
    // };
    // }, [router]);
  }, []);

  return (
    <AuthProvider>
      <CookiesProvider>
      <LayoutComponent>
        <Component {...pageProps} />
      </LayoutComponent>
      </CookiesProvider>
    </AuthProvider>
  );
}

export default MyApp;
