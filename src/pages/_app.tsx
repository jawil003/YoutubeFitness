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
import CreateCourseMenu from "../components/CreateCourseDialog/Index";
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { ThemeProvider } from "@material-ui/core";
import theme from "../styles/materialUi";
import useValidateEnvironment from "../hooks/useValidateEnvironment.hook";
import BottomAndHeaderContext from "src/contexts/BottomAndHeaderContext";
import IntentContext from "src/contexts/IntentContext";
import YoutubeFullScreenDialog from "src/components/YoutubeVideoFullscreenDialog";
import { ReactQueryDevtools } from "react-query/devtools";
import Video from "src/entities/video.entity";

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
    data: {
      title: "",
      videos: [] as Video &
        {
          begin: number;
          end: number;
        }[],
    },
  });
  const [
    buttonAndHeaderContext,
    setButtonAndHeaderContext,
  ] = useState({
    headerOpen: true,
    bottomOpen: true,
  });
  const [
    intentState,
    setIntentState,
  ] = useState({
    youtubeOpen: false,
    data: {
      youtube: {
        title: "",
        videos: [] as (Video & {
          begin?: number;
          end?: number;
        })[],
      },
    },
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
          <IntentContext.Provider
            value={{
              ...intentState,
              toggleYoutube: (data) =>
                data
                  ? setIntentState(
                      (prev) => ({
                        ...prev,
                        data: {
                          ...prev.data,
                          youtube: data,
                        },
                        youtubeOpen: !prev.youtubeOpen,
                      }),
                    )
                  : setIntentState(
                      (prev) => ({
                        ...prev,
                        data: {
                          ...prev.data,
                        },
                        youtubeOpen: !prev.youtubeOpen,
                      }),
                    ),
            }}
          >
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
                  setData: (data) =>
                    setFloatingButtonContext(
                      (prev) => ({
                        ...prev,
                        data,
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
                <YoutubeFullScreenDialog
                  open={
                    intentState.youtubeOpen
                  }
                />
                <BottomNavBar />
                <CreateCourseMenu />
              </FloatingButtonContext.Provider>
            </BottomAndHeaderContext.Provider>
          </IntentContext.Provider>
        </ThemeProvider>
        <ReactQueryDevtools
          initialIsOpen={false}
        />
      </QueryClientProvider>
    </>
  );
};

export default MyApp;
