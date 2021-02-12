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
import YoutubeTimerService from "src/services/frontend/youtubeTimer.service";

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
  const youtubeRef = React.createRef<YouTube>();
  const [
    youtubeVideoId,
    setYoutubeId,
  ] = useState("");
  const [
    videoStart,
    setVideoStart,
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
      if (
        firstVideo.end &&
        firstVideo.begin
      )
        YoutubeTimerService.get().start(
          firstVideo.end -
            firstVideo.begin,
          () => {
            youtubeRef.current
              ?.getInternalPlayer()
              .pauseVideo();
          },
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
          ref={youtubeRef}
          videoId={
            //TODO: Implement mechanism to loop through them and go to next automatic etc
            youtubeVideoId
          }
          opts={{
            playerVars: {
              autoplay: 1,
              start:
                youtube?.videos
                  ?.length > 0
                  ? youtube?.videos[0]
                      .begin
                  : undefined,
            },
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default YoutubeFullScreenDialog;
