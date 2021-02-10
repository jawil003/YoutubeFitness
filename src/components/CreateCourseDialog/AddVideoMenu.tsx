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
  Slider,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import React, {
  useMemo,
  useState,
} from "react";
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
  } = useDialogStepperContext();
  const [url, setUrl] = useState("");
  const [
    urlError,
    setUrlError,
  ] = useState("");
  const [
    stepperRange,
    setStepperRange,
  ] = useState<number[]>([0, 20]);
  const [
    useWholeVideo,
    setUseWholeVideo,
  ] = useState(true);
  const marks = [
    {
      value: 0,
      label: "00:00:00",
    },
    {
      value: 100,
      label: "01:00:00",
    },
  ];
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
              max-width: 552px;
              width: 100%;
            }
          `}
        >
          <List
            css={css`
              & {
                flex: 1;
                height: 300px;
                overflow-y: scroll;
              }
            `}
          >
            {useMemo(
              () =>
                videos.length > 0 ? (
                  videos.map(
                    ({ url }) => (
                      <ListItem>
                        <ListItemText>
                          {
                            url.split(
                              "v=",
                            )[1]
                          }
                        </ListItemText>
                      </ListItem>
                    ),
                  )
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
                    <span>
                      No Videos
                    </span>
                  </FlexContainer>
                ),
              [videos],
            )}
          </List>
          <FlexContainer
            rowGap="20px"
            direction="column"
            justifyContent="center"
            css={css`
              & {
                flex: 1;
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
                  setUrlError("");
                } catch (err) {
                  setUrlError(
                    (err as yup.ValidationError)
                      .errors[0],
                  );
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
            <FormControlLabel
              value="wholeVideo"
              control={
                <Checkbox
                  checked={
                    useWholeVideo
                  }
                  onChange={() =>
                    setUseWholeVideo(
                      (prev) => !prev,
                    )
                  }
                  color="secondary"
                />
              }
              label="Use whole Video"
              labelPlacement="end"
            />
            {!useWholeVideo ? (
              <Slider
                value={stepperRange}
                onChange={(
                  _,
                  newValue,
                ) =>
                  setStepperRange(
                    newValue as number[],
                  )
                }
                marks={marks}
                defaultValue={0}
                valueLabelDisplay="auto"
                max={100}
              />
            ) : undefined}
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
