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
        <YouTube
          onEnd={() => {
            if (
              currentVideo ===
              youtube.videos.length - 1
            ) {
              toggleYoutube();
              return;
            }
            const nextVideo =
              youtube.videos[
                currentVideo + 1
              ];
            setYoutubeId(
              nextVideo.videoId as string,
            );
            setVideoStart(
              nextVideo.begin as number,
            );
            setVideoEnd(
              nextVideo.end as number,
            );
            setCurrentVideo(
              (prev) => prev + 1,
            );
          }}
          videoId={youtubeVideoId}
          opts={{
            playerVars: {
              autoplay: 1,
              start: videoStart,
              end: videoEnd,
            },
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default YoutubeFullScreenDialog;
