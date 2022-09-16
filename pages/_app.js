import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "../utils/auth";
import Head from "next/head";
import Layout from "../components/Layout";
import Navbar from "../components/nav";
import React from "react";
import ProgressBar from "../components/ProgressBar";
import { useRouter } from "next/router";
import { useEffect } from 'react'
import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
import '../styles/Progress.css'

function MyApp({ Component, pageProps, ...appProps }) {
  const isLayoutNeeded = ["/login", "/register", "/forgot-password"].includes(appProps.router.pathname);
  const LayoutComponent = isLayoutNeeded ? React.Fragment : Layout;

  const router = useRouter()

  useEffect(() => {
    const handleStart = (url) => {
      console.log(`Loading: ${url}`)
      NProgress.start()
    }

    const handleStop = () => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </Head>
      {/* <ProgressBar /> */}
      <AuthProvider>
        <LayoutComponent>
          <Component {...pageProps} />
        </LayoutComponent>
      </AuthProvider>
    </>
  );
}

export default MyApp;
