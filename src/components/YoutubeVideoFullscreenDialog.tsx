import {
  AppBar,
  Dialog,
  Toolbar,
  IconButton,
  DialogContent,
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
import TimeConverterService from "../services/frontend/timeConverter.service";

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
  const {
    toggleYoutube,
    data: { youtube },
  } = useIntentContext();
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
  };
  const resetVideoState = () => {
    setYoutubeData({
      index: -1,
      videoId: "",
      begin: 0,
      end: 0,
    });
  };
  useEffect(() => {
    if (open) setNextVideo();
    setVideoQueue(
      youtube.videos.filter(
        (_, index) => index !== 0,
      ),
    );
  }, [open]);

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
          & {
            display: inline-flex;
            flex-direction: row;
            width: 100%;
            margin-top: 64px;
            justify-content: center;
          }
          & > .youtube-container {
            display: flex;
            align-items: flex-start;
            flex: 1;
            width: 100%;
            padding-top: calc(
              calc(100% / 16) * 9
            );
            position: relative;
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
            & > .youtube-container {
              width: 100%;
              padding-top: calc(
                calc(100% / 16) * 9
              );
              position: relative;
            }
          `}
        >
          <YouTube
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
                autoplay: 1,
                start: begin,
                end: end,
                enablejsapi: 1,
                controls: 0,
              },
            }}
          />
        </div>
        {useMemo(
          () => (
            <FlexContainer
              rowGap="20px"
              alignItems="center"
              css={css`
                & {
                  min-width: 340px;
                  padding: 0px 20px;
                }
              `}
              direction="column"
            >
              {videoQueue.map(
                ({
                  begin,
                  end,
                  title,
                }) => (
                  <VideoWithTimestamp
                    title={
                      title as string
                    }
                    timestamp={TimeConverterService.secondsToHHMMSS(
                      (end as number) -
                        (begin as number),
                    )}
                  />
                ),
              )}
            </FlexContainer>
          ),
          [videoQueue],
        )}
      </DialogContent>
    </Dialog>
  );
};

export default YoutubeFullScreenDialog;
