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
  var [
    currentVideo,
    setCurrentVideo,
  ] = useState(0);
  const {
    toggleYoutube,
    data: { youtube },
  } = useIntentContext();
  const [
    youtubeVideoId,
    setYoutubeId,
  ] = useState("");
  const [
    videoStart,
    setVideoStart,
  ] = useState(0);
  const [
    videoEnd,
    setVideoEnd,
  ] = useState(0);
  useEffect(() => {
    if (open) {
      const firstVideo =
        youtube.videos[0];
      if (!firstVideo)
        throw new Error(
          "No Videos passed to component!",
        );

      setYoutubeId(
        firstVideo.videoId as string,
      );
      setVideoStart(
        firstVideo.begin as number,
      );
      setVideoEnd(
        firstVideo.end as number,
      );
      setTimeout(() => {
        const nextVideo =
          youtube.videos[1];
        setYoutubeId(
          nextVideo.videoId as string,
        );
        setVideoStart(
          nextVideo.begin as number,
        );
        setVideoEnd(
          nextVideo.end as number,
        );
      }, ((firstVideo.end as number) - (firstVideo.begin as number)) * 1000);
    }
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
            onClick={() =>
              toggleYoutube()
            }
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
        {useMemo(
          () => (
            <iframe
              css={css`
                @media (min-width: ${designSystem
                    .breakpoints
                    .phoneOnly}) {
                  & {
                    border-radius: 8px;
                    width: 50vw;
                    height: calc(
                      calc(50vw / 16) *
                        9
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
                          calc(
                              100vw / 16
                            ) * 9
                        ) - 40px
                    );
                  }
                }
              `}
              src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&start=${videoStart}&end=${videoEnd}`}
              allowFullScreen
              allow="autoplay"
              frameBorder={0}
            />
          ),
          [youtubeVideoId],
        )}
      </DialogContent>
    </Dialog>
  );
};

export default YoutubeFullScreenDialog;
