import {
  AppBar,
  Dialog,
  Toolbar,
  IconButton,
  DialogContent,
  Typography,
} from "@material-ui/core";
import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import CloseIcon from "@material-ui/icons/Close";
import useIntentContext from "src/hooks/useIntent.hook";
import YouTube from "react-youtube";
import { css } from "@emotion/react";
import VideoWithTimestamp from "../components/VideoWithTimestamp";
import FlexContainer from "../components/FlexContainer";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import PauseIcon from "@material-ui/icons/Pause";
import designSystem from "../styles/designSystem";
interface Props {
  open: boolean;
}

/**
 * An YoutubeFullScreenDialog React Component.
 * @author Jannik Will
 * @version 0.1
 */
const YoutubeFullScreenDialog: React.FC<Props> = ({
  open,
}) => {
  let timerId: number;
  const ref = React.createRef<YouTube>();
  const {
    toggleYoutube,
    data: { youtube },
  } = useIntentContext();
  const [
    autoplay,
    setAutoplay,
  ] = useState<0 | 1>(0);
  const [
    { videoId, begin, end, index },
    setYoutubeData,
  ] = useState({
    index: -1,
    videoId: "",
    begin: 0,
    end: 0,
  });
  const [
    videoQueue,
    setVideoQueue,
  ] = useState<typeof youtube.videos>(
    [],
  );
  const setNextVideo = () => {
    const nextIndex = index + 1;
    if (
      youtube.videos.length - 1 <
      nextIndex
    ) {
      resetVideoState();
      toggleYoutube();
      return;
    }
    const nextVideo =
      youtube.videos[nextIndex];

    setYoutubeData({
      index: nextIndex,
      videoId: nextVideo.videoId as string,
      begin: nextVideo.begin as number,
      end: nextVideo.end as number,
    });
    setCurrentTime(
      (nextVideo.end as number) -
        (nextVideo.begin as number),
    );
  };
  const resetVideoState = () => {
    setYoutubeData({
      index: -1,
      videoId: "",
      begin: 0,
      end: 0,
    });
  };
  const [
    currentTime,
    setCurrentTime,
  ] = useState(-1);
  useEffect(() => {
    if (open) {
      setNextVideo();
      setVideoQueue(youtube.videos);
      if (youtube.videos.length > 0)
        setCurrentTime(
          (youtube.videos[0]
            .end as number) -
            (youtube.videos[0]
              .begin as number),
        );
      setAutoplay(1);
      setupTimestampListener();
    } else {
      teardownTimestampListener();
    }
  }, [open]);

  const setupTimestampListener = () => {
    timerId = window.setInterval(() => {
      const beginStamp = ref.current
        ?.getInternalPlayer()
        .getCurrentTime();

      if (
        isNaN(beginStamp) ||
        isNaN(end) ||
        currentTime < 1
      )
        return;

      setCurrentTime(end - beginStamp);
    }, 1000);
  };

  const teardownTimestampListener = () => {
    window.clearInterval(timerId);
  };

  return (
    <Dialog open={open} fullScreen>
      <AppBar
        css={css`
          &.MuiPaper-elevation4 {
            box-shadow: none;
          }
        `}
      >
        <Toolbar>
          <IconButton
            focusRipple={false}
            disableRipple
            onClick={() => {
              resetVideoState();
              toggleYoutube();
            }}
            edge="start"
            color="inherit"
            aria-label="close"
          >
            <CloseIcon
              css={css`
                &.MuiSvgIcon-root {
                  font-size: 45px;
                }
              `}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent
        css={css`
          @media (min-width: ${designSystem
              .breakpoints
              .tabletLandscapeUp}) {
            & {
              flex-direction: row;
            }
          }
          @media (max-width: ${designSystem
              .breakpoints
              .tabletLandscapeUp}) {
            & {
              flex-direction: column;
            }
          }
          & {
            display: inline-flex;

            width: 100%;
            margin-top: 64px;
            justify-content: center;
          }
        `}
      >
        <div
          css={css`
            & {
              flex: 1;
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              overflow-x: hidden;
            }
            @media (max-width: ${designSystem
                .breakpoints
                .tabletLandscapeUp}) {
              & > .youtube-container {
                margin: auto;
                width: calc(
                  calc(
                      calc(
                          50vh -
                            calc(
                              64px +
                                calc(
                                  8px +
                                    42px
                                )
                            )
                        ) / 9
                    ) * 16
                );

                height: calc(
                  50vh -
                    calc(
                      64px +
                        calc(8px + 42px)
                    )
                );
              }
            }
            @media (min-width: ${designSystem
                .breakpoints
                .tabletLandscapeUp}) {
              & > .youtube-container {
                width: 100%;
                padding-top: calc(
                  calc(100% / 16) * 9
                );
              }
            }
            & > .youtube-container {
              display: flex;
              align-items: flex-start;
              position: relative;
            }
          `}
        >
          <YouTube
            ref={ref}
            containerClassName="youtube-container"
            css={css`
              & {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: 8px;
              }
            `}
            onReady={({ target }) => {
              timerId = window.setInterval(
                () => {
                  const beginStamp = target.getCurrentTime();

                  if (
                    isNaN(beginStamp) ||
                    isNaN(end) ||
                    currentTime < 1
                  )
                    return;

                  setCurrentTime(
                    end - beginStamp,
                  );
                },
                1000,
              );
            }}
            onError={() => {}}
            onEnd={() => {
              setNextVideo();
              setVideoQueue((prev) => [
                ...prev.filter(
                  (_, index) =>
                    index !== 0,
                ),
              ]);
            }}
            videoId={videoId}
            opts={{
              playerVars: {
                autoplay,
                start: begin,
                end: end,
                enablejsapi: 1,
                controls: 0,
              },
            }}
          />
          <FlexContainer
            justifyContent="center"
            css={css`
              & {
                width: 100%;
                min-height: 40px;
              }
            `}
          >
            <IconButton
              onClick={() => {
                ref.current
                  ?.getInternalPlayer()
                  .playVideo();
              }}
            >
              <PlayArrowIcon fontSize="large" />
            </IconButton>
            <IconButton
              onClick={() => {
                ref.current
                  ?.getInternalPlayer()
                  .pauseVideo();
              }}
            >
              <PauseIcon fontSize="large" />
            </IconButton>
            <IconButton
              onClick={() => {
                setNextVideo();
                setVideoQueue(
                  (prev) => [
                    ...prev.filter(
                      (_, index) =>
                        index !== 0,
                    ),
                  ],
                );
              }}
            >
              <SkipNextIcon fontSize="large" />
            </IconButton>
          </FlexContainer>
        </div>
        {useMemo(
          () => (
            <FlexContainer
              rowGap="20px"
              css={css`
                & {
                  min-width: 340px;
                  padding: 0px 20px;

                  height: 100%;
                }
                @media (max-width: ${designSystem
                    .breakpoints
                    .tabletLandscapeUp}) {
                  & {
                    width: 100%;
                    flex: 1;
                  }
                }
              `}
              direction="column"
            >
              <Typography
                variant="h4"
                variantMapping={{
                  h4: "h2",
                }}
              >
                Playlist
              </Typography>
              <FlexContainer
                rowGap="20px"
                columnGap="20px"
                css={css`
                  & {
                    width: 100%;
                    height: 100%;
                  }
                  @media (max-width: ${designSystem
                      .breakpoints
                      .tabletLandscapeUp}) {
                    && {
                      flex-direction: row;
                      flex: 1;
                      align-items: flex-start;
                      flex-wrap: wrap;
                      align-items: flex-start;
                      justify-content: center;
                    }
                  }
                `}
                alignItems="flex-start"
                direction="column"
              >
                {videoQueue.map(
                  (
                    {
                      begin,
                      end,
                      title,
                    },
                    index,
                  ) => (
                    <VideoWithTimestamp
                      title={
                        title as string
                      }
                      current={
                        index === 0
                      }
                      timestamp={
                        index === 0
                          ? currentTime
                          : (end as number) -
                            (begin as number)
                      }
                    />
                  ),
                )}
              </FlexContainer>
            </FlexContainer>
          ),
          [videoQueue, currentTime],
        )}
      </DialogContent>
    </Dialog>
  );
};

export default YoutubeFullScreenDialog;
