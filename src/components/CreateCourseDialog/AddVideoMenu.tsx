import { css } from "@emotion/react";
import {
  DialogContent,
  DialogContentText,
  List,
  ListItem,
  ListItemText,
  Button,
  DialogActions,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import useDialogStepperContext from "../../hooks/useDialogStepperContext.hook";
import FlexContainer from "../FlexContainer";
import * as yup from "yup";

/**
 * An OverlayMenu React Component.
 * @author Jannik Will
 * @version 0.1
 */
const AddVideoMenu: React.FC = () => {
  const {
    setActiveStep,
    videos,
    setValues,
    videosError: { urlError },
    setVideosError,
  } = useDialogStepperContext();
  const [url, setUrl] = useState("");
  const [
    starttime,
    setStarttime,
  ] = useState(0);
  const [
    endtime,
    setEndtime,
  ] = useState(10);
  const youtubeVideoUrlSchema = yup
    .string()
    .url(
      "Please insert an valid Youtube Video Link",
    );
  return (
    <>
      <DialogContent>
        <DialogContentText>
          Just add a new Fitness Course
          to start with, just enter the
          Address of an YouTube Video
        </DialogContentText>
        <FlexContainer
          columnGap="40px"
          css={css`
            & {
              max-width: 500px;
              width: 100%;
            }
          `}
        >
          <List
            css={css`
              & {
                min-width: 50%;
                height: 300px;
                overflow-y: scroll;
              }
            `}
          >
            {videos.length > 0 ? (
              videos.map(({ url }) => (
                <ListItem>
                  <ListItemText>
                    {url.split("v=")[1]}
                  </ListItemText>
                </ListItem>
              ))
            ) : (
              <FlexContainer
                css={css`
                  & {
                    height: 100%;
                  }
                `}
                alignItems="center"
                justifyContent="center"
              >
                <span>No Videos</span>
              </FlexContainer>
            )}
          </List>
          <FlexContainer
            rowGap="20px"
            direction="column"
            justifyContent="center"
            css={css`
              & {
                min-height: 100%;
              }
            `}
          >
            <TextField
              fullWidth
              placeholder="https://www.youtube.com/watch?v=UItWltVZZmE"
              autoFocus
              value={url}
              onChange={async ({
                target: { value: url },
              }) => {
                try {
                  await youtubeVideoUrlSchema.validate(
                    url,
                  );
                  setVideosError({
                    urlError: "",
                  });
                } catch (err) {
                  setVideosError({
                    urlError: (err as yup.ValidationError)
                      .errors[0],
                  });
                } finally {
                  setUrl(url);
                }
              }}
              error={urlError != ""}
              helperText={urlError}
              label="YoutubeVideoUrl"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              fullWidth
              placeholder="0:00:00"
              value={starttime}
              type="number"
              label="From"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              fullWidth
              placeholder="0:00:10"
              value={endtime}
              type="number"
              label="To"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              onClick={() => {
                setValues((prev) => ({
                  ...prev,
                  videos: [
                    ...prev.videos,
                    { url },
                  ],
                }));
                setUrl("");
              }}
            >
              Add Video
            </Button>
          </FlexContainer>
        </FlexContainer>
      </DialogContent>
      <DialogActions>
        <Button
          css={css`
            & {
              align-self: flex-end;
            }
          `}
          onClick={() => {
            setActiveStep(0);
          }}
        >
          Previous
        </Button>
        <Button onClick={() => {}}>
          Finish
        </Button>
      </DialogActions>
    </>
  );
};

export default AddVideoMenu;
