import React, { useState } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import BottomNavBar from "../components/BottomNavBar";
import Header from "../components/Header";
import globalStyles from "../styles/styles";
import Main from "../components/Main";
import FloatingButtonContext from "../contexts/FloatingButtonContext";
import OverlayMenu from "../components/Overflaymenu";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

/**
 * An App React Component.
 * @author Jannik Will
 * @version 0.1
 */
const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [floatingButtonContext, setFloatingButtonContext] = useState({
    menuOpen: false,
  });
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {globalStyles}
      <QueryClientProvider client={queryClient}>
        <FloatingButtonContext.Provider
          value={{
            ...floatingButtonContext,
            toggle: () =>
              setFloatingButtonContext((prev) => ({
                ...prev,
                menuOpen: !prev.menuOpen,
              })),
          }}
        >
          <Header />
          <Main>
            <Component {...pageProps} />
          </Main>
          <BottomNavBar />
          <OverlayMenu />
        </FloatingButtonContext.Provider>
      </QueryClientProvider>
    </>
  );
};

export default MyApp;
