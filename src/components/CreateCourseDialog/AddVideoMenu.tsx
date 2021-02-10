import { css } from "@emotion/react";
import YouTubeIcon from "@material-ui/icons/YouTube";
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
  ListItemSecondaryAction,
  ListItemIcon,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React, {
  useMemo,
  useState,
} from "react";
import useDialogStepperContext from "../../hooks/useDialogStepperContext.hook";
import FlexContainer from "../FlexContainer";
import * as yup from "yup";
import { useQuery } from "react-query";
import YoutubeService from "../../services/frontend/youtube.service";

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
  ] = useState<number[]>([0, 100]);
  const [
    useWholeVideo,
    setUseWholeVideo,
  ] = useState(true);
  const [
    videoUrl,
    setVideoUrl,
  ] = useState("");
  const { data: video } = useQuery(
    ["video", videoUrl],
    async () => {
      if (videoUrl != "")
        return await new YoutubeService().getMetadataForVideo(
          videoUrl,
        );
    },
    {
      placeholderData: {
        title: "No Title",
        duration: "100",
      },
    },
  );
  const youtubeVideoUrlSchema = yup
    .string()
    .url(
      "Please insert an valid Youtube Video Link",
    );
  const resetState = () => {
    setUrl("");
    setVideoUrl("");
    setUseWholeVideo(true);
    setUrlError("");
  };
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

                min-height: 100%;
                overflow-y: scroll;
                border: 1px solid
                  rgba(0, 0, 0, 0.12);
                padding: 40px;
                border-radius: 4px;
              }
            `}
          >
            {useMemo(
              () =>
                videos.length > 0 ? (
                  videos.map(
                    ({ url }) => (
                      <ListItem>
                        <ListItemIcon>
                          <YouTubeIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            url.split(
                              "v=",
                            )[1]
                          }
                        />

                        <ListItemSecondaryAction>
                          <IconButton edge="end">
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
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
            css={css`
              & {
                margin: auto !important;
                flex: 1;
                min-height: 100%;
                border: 1px solid
                  rgba(0, 0, 0, 0.12);
                padding: 40px;
                border-radius: 4px;
              }
            `}
            rowGap="20px"
            direction="column"
            justifyContent="center"
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
                  setVideoUrl(url);
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
            {urlError === "" && url
              ? [
                  <FormControlLabel
                    value="wholeVideo"
                    control={
                      <Checkbox
                        checked={
                          useWholeVideo
                        }
                        onChange={() =>
                          setUseWholeVideo(
                            (prev) =>
                              !prev,
                          )
                        }
                        color="secondary"
                      />
                    }
                    label="Use whole Video"
                    labelPlacement="end"
                  />,
                  !useWholeVideo
                    ? [
                        <Slider
                          key={`slider-${video?.title}`}
                          css={css`
                            &.MuiSlider-root {
                              margin: auto !important;
                              width: calc(
                                100% -
                                  40px
                              );
                            }
                          `}
                          value={
                            stepperRange
                          }
                          onChange={(
                            _,
                            newValue,
                          ) =>
                            setStepperRange(
                              newValue as number[],
                            )
                          }
                          max={Number(
                            video?.duration,
                          )}
                          defaultValue={
                            0
                          }
                        />,
                        <FlexContainer columnGap="10px">
                          <TextField
                            onChange={({
                              target: {
                                value,
                              },
                            }) => {
                              const newValue = Number(
                                value,
                              );
                              if (
                                newValue <
                                  stepperRange[0] &&
                                newValue <=
                                  Number(
                                    video?.duration,
                                  )
                              )
                                setStepperRange(
                                  (
                                    prev,
                                  ) => [
                                    Number(
                                      value,
                                    ),
                                    prev[1],
                                  ],
                                );
                            }}
                            css={css`
                              & {
                                width: 100px;
                              }
                            `}
                            value={
                              stepperRange[0]
                            }
                          />
                          <div
                            css={css`
                              & {
                                flex: 1;
                              }
                            `}
                          />
                          <TextField
                            onChange={({
                              target: {
                                value,
                              },
                            }) => {
                              const newValue = Number(
                                value,
                              );
                              if (
                                stepperRange[0] <
                                  newValue &&
                                newValue <=
                                  Number(
                                    video?.duration,
                                  )
                              )
                                setStepperRange(
                                  (
                                    prev,
                                  ) => [
                                    prev[0],
                                    newValue,
                                  ],
                                );
                            }}
                            css={css`
                              & {
                                width: 100px;
                              }
                            `}
                            value={
                              stepperRange[1]
                            }
                          />
                        </FlexContainer>,
                      ]
                    : undefined,
                ]
              : undefined}
            <Button
              onClick={() => {
                setValues((prev) => ({
                  ...prev,
                  videos: [
                    ...prev.videos,
                    { url },
                  ],
                }));
                resetState();
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
            resetState();
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
