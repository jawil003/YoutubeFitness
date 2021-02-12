import {
  AppBar,
  Dialog,
  Toolbar,
  IconButton,
  DialogContent,
} from "@material-ui/core";
import React, {
  useEffect,
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
  const youtubeRef = React.createRef<YouTube>();
  useEffect(() => {
    const youtubeElement =
      youtubeRef?.current;
    if (
      youtubeElement &&
      youtube.videos.length > 1
    ) {
      const youtubePlayer = youtubeElement.getInternalPlayer();
      const videos = youtube.videos.splice(
        0,
        1,
      );
      for (const {
        begin,
        end,
        videoId,
      } of videos) {
        youtubePlayer.cueVideoByUrl({
          mediaContentUrl: `http://www.youtube.com/v/${videoId}?version=3`,
          startSeconds: begin,
          endSeconds: end,
        });
      }
    }
  }, []);
  const {
    toggleYoutube,
    data: { youtube },
  } = useIntentContext();
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
            youtube?.videos?.length > 0
              ? (youtube?.videos[0]
                  .videoId as string)
              : undefined
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
              end:
                youtube?.videos
                  ?.length > 0
                  ? youtube?.videos[0]
                      .end
                  : undefined,
            },
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default YoutubeFullScreenDialog;
