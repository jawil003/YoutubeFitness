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
import useTimestampReducer from "src/reducer/timeStamp.reducer";
import Course from "../../entities/course.entitiy";
import VideoRepository from "src/services/frontend/videoRepository.service";
import Video from "src/entities/video.entity";
import CourseRepository from "src/services/frontend/courseRepository.service";
import useFabContext from "src/hooks/useFabContext";

const TimelineInputStyle = css`
  & {
    width: 80px;
  }
  &
    .MuiInputBase-input.MuiInputBase-input {
    text-align: center;
  }
`;

/**
 * An OverlayMenu React Component.
 * @author Jannik Will
 * @version 0.1
 */
const AddVideoMenu: React.FC = () => {
  const {
    setActiveStep,
    course,
    videos,
    setValues,
  } = useDialogStepperContext();
  const { toggle } = useFabContext();
  const [
    useWholeVideo,
    setUseWholeVideo,
  ] = useState(true);
  const [
    {
      url: videoUrl,
      error: videoError,
    },
    setVideoState,
  ] = useState({ url: "", error: "" });
  const { data: video } = useQuery<{
    title?: string;
    id?: string;
    thumbnailUrl?: string;
    url?: string;
    duration: number;
  }>(
    ["video", videoUrl],
    async () => {
      return await new YoutubeService().getMetadataForVideo(
        videoUrl,
      );
    },
    {
      placeholderData: {
        duration: 100,
      },
      enabled:
        videoError === "" &&
        videoUrl !== "",
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );
  const [
    {
      seconds: {
        begin: beginSecond,
        end: endSecond,
      },
      timestamp: {
        begin: beginTimestamp,
        end: endTimestamp,
      },
    },
    dispatch,
  ] = useTimestampReducer();
  const youtubeVideoUrlSchema = yup
    .string()
    .url(
      "Please insert an valid Youtube Video Link",
    );
  const resetState = () => {
    setVideoState({
      url: "",
      error: "",
    });
    setUseWholeVideo(true);
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
                    (
                      { title },
                      index,
                    ) => (
                      <ListItem>
                        <ListItemIcon>
                          <YouTubeIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            title
                          }
                        />

                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            onClick={() => {
                              setValues(
                                (
                                  prev,
                                ) => ({
                                  ...prev,
                                  videos: prev.videos.filter(
                                    (
                                      _,
                                      indexVideo,
                                    ) =>
                                      index !==
                                      indexVideo,
                                  ),
                                }),
                              );
                            }}
                          >
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
              value={videoUrl}
              onChange={async ({
                target: { value: url },
              }) => {
                try {
                  await youtubeVideoUrlSchema.validate(
                    url,
                  );

                  setVideoState(
                    (prev) => ({
                      ...prev,
                      url,
                      error: "",
                    }),
                  );
                } catch (err) {
                  setVideoState(
                    (prev) => ({
                      ...prev,
                      error: (err as yup.ValidationError)
                        .errors[0],
                    }),
                  );
                } finally {
                  setVideoState(
                    (prev) => ({
                      ...prev,
                      url,
                    }),
                  );
                }
              }}
              error={videoError != ""}
              helperText={videoError}
              label="YoutubeVideoUrl"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            {videoError === "" &&
            videoUrl
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
                          css={css`
                            &.MuiSlider-root {
                              margin: auto !important;
                              width: calc(
                                100% -
                                  40px
                              );
                            }
                          `}
                          value={[
                            beginSecond,
                            endSecond,
                          ]}
                          onChange={(
                            _,
                            newValue,
                          ) => {
                            const [
                              beginSecond,
                              endSecond,
                            ] = newValue as number[];
                            dispatch({
                              type:
                                "ADD_SECONDS_BEGIN",
                              value: beginSecond,
                            });
                            dispatch({
                              type:
                                "ADD_SECONDS_END",
                              value: endSecond,
                            });
                          }}
                          max={Number(
                            video?.duration,
                          )}
                          defaultValue={
                            0
                          }
                        />,
                        <FlexContainer columnGap="10px">
                          <TextField
                            css={
                              TimelineInputStyle
                            }
                            onChange={({
                              target: {
                                value,
                              },
                            }) => {
                              dispatch({
                                type:
                                  "ADD_FORMATTTED_BEGIN",
                                value,
                              });
                            }}
                            value={
                              beginTimestamp
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
                              dispatch({
                                type:
                                  "ADD_FORMATTTED_END",
                                value,
                              });
                            }}
                            css={
                              TimelineInputStyle
                            }
                            value={
                              endTimestamp
                            }
                          />
                        </FlexContainer>,
                      ]
                    : undefined,
                ]
              : undefined}
            <Button
              disabled={
                videoUrl === "" ||
                videoError !== ""
              }
              onClick={() => {
                setValues((prev) => ({
                  ...prev,
                  videos: [
                    ...prev.videos,
                    video as any,
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
        <Button
          disabled={videos.length === 0}
          onClick={async () => {
            const courseEntity = new Course(
              course.title,
            );
            const videoIds: Video[] = [];

            for (const video of videos) {
              videoIds.push({
                id: (
                  await VideoRepository.save(
                    {
                      ...video,
                      id: undefined,
                    },
                  )
                ).id,
              });
            }
            await CourseRepository.save(
              courseEntity,
            );
            toggle();
          }}
        >
          Finish
        </Button>
      </DialogActions>
    </>
  );
};

export default AddVideoMenu;
