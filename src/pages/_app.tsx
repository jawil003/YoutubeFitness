import React, {
  useEffect,
  useState,
} from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import BottomNavBar from "../components/BottomNavBar";
import Header from "../components/Header";
import globalStyles from "../styles/styles";
import Main from "../components/Main";
import FloatingButtonContext from "../contexts/FloatingButtonContext";
import CreateCourseMenu from "../components/CreateCourseMenu";
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { ThemeProvider } from "@material-ui/core";
import theme from "../styles/materialUi";
import useValidateEnvironment from "../hooks/useValidateEnvironment.hook";
import BottomAndHeaderContext from "src/contexts/BottomAndHeaderContext";

const queryClient = new QueryClient();

/**
 * An App React Component.
 * @author Jannik Will
 * @version 0.1
 */
const MyApp: React.FC<AppProps> = ({
  Component,
  pageProps,
}) => {
  const [
    floatingButtonContext,
    setFloatingButtonContext,
  ] = useState({
    menuOpen: false,
  });
  const [
    buttonAndHeaderContext,
    setButtonAndHeaderContext,
  ] = useState({
    headerOpen: true,
    bottomOpen: true,
  });
  const validateEnvironment = useValidateEnvironment();

  useEffect(() => {
    validateEnvironment();
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
      </Head>
      {globalStyles}
      <QueryClientProvider
        client={queryClient}
      >
        <ThemeProvider theme={theme}>
          <BottomAndHeaderContext.Provider
            value={{
              ...buttonAndHeaderContext,
              set: setButtonAndHeaderContext,
            }}
          >
            <FloatingButtonContext.Provider
              value={{
                ...floatingButtonContext,
                toggle: () =>
                  setFloatingButtonContext(
                    (prev) => ({
                      ...prev,
                      menuOpen: !prev.menuOpen,
                    }),
                  ),
              }}
            >
              <Header />
              <Main>
                <Component
                  {...pageProps}
                />
              </Main>
              <BottomNavBar />
              <CreateCourseMenu />
            </FloatingButtonContext.Provider>
          </BottomAndHeaderContext.Provider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
};

export default MyApp;
