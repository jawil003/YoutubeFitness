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
  } = useDialogStepperContext();
  const [url, setUrl] = useState("");
  return (
    <>
      <DialogContent>
        <DialogContentText>
          Just add a new Fitness Course
          to start with, just enter the
          Address of an YouTube Video
        </DialogContentText>
        <FlexContainer>
          <List
            css={css`
              & {
                min-width: 50%;
                height: 300px;
              }
            `}
          >
            {videos.length > 0 ? (
              videos.map(({ url }) => (
                <ListItem>
                  <ListItemText>
                    {url}
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
              value={url}
              onChange={({
                target: { value: url },
              }) => setUrl(url)}
              label="YoutubeVideoUrl"
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
