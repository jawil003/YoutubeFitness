import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import BottomNavBar from "../components/BottomNavBar";
import Header from "../components/Header";
import globalStyles from "../styles/styles";
/**
 * An App React Component.
 * @author Jannik Will
 * @version 0.1
 */
const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {globalStyles}
      <Header name="Index" />
      <Component {...pageProps} />
      <BottomNavBar />
    </>
  );
};

export default MyApp;
