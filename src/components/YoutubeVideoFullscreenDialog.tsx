import {
  AppBar,
  Dialog,
  Toolbar,
  IconButton,
  DialogContent,
} from "@material-ui/core";
import React, {
  useEffect,
  useState,
} from "react";
import CloseIcon from "@material-ui/icons/Close";
import useIntentContext from "src/hooks/useIntent.hook";
import YouTube from "react-youtube";
import { css } from "@emotion/react";
import designSystem from "src/styles/designSystem";

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
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
        `}
      >
        <YouTube
          css={css`
            @media (min-width: ${designSystem
                .breakpoints
                .phoneOnly}) {
              & {
                border-radius: 8px;
                width: 50vw;
                height: calc(
                  calc(50vw / 16) * 9
                );
              }
            }
            @media (max-width: ${designSystem
                .breakpoints
                .phoneOnly}) {
              & {
                width: calc(
                  100vw - 40px
                );
                height: calc(
                  calc(
                      calc(100vw / 16) *
                        9
                    ) - 40px
                );
              }
            }
          `}
          onError={() => {}}
          onEnd={() => {
            setNextVideo();
          }}
          videoId={videoId}
          opts={{
            playerVars: {
              autoplay: 1,
              start: begin,
              end: end,
              enablejsapi: 1,
            },
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default YoutubeFullScreenDialog;
