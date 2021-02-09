import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
  DialogActions,
} from "@material-ui/core";
import React, {
  useEffect,
  useState,
} from "react";
import useFabContext from "../hooks/useFabContext";
import * as yup from "yup";
import YoutubeService from "src/services/frontend/youtube.service";
import Course from "src/entities/course.entitiy";
import logger from "logger";
import CourseRepository from "src/services/frontend/courseRepository.service";
import { useQueryClient } from "react-query";
import { Query } from "../config/reactQuery.enum";

/**
 * An OverlayMenu React Component.
 * @author Jannik Will
 * @version 0.1
 */
const CreateCourseMenu: React.FC = () => {
  const queryClient = useQueryClient();
  const youtubeService = new YoutubeService();
  const {
    menuOpen,
    toggle,
  } = useFabContext();
  const [url, setUrl] = useState("");
  const validation = yup
    .string()
    .required(
      "Please insert an Youtube Url",
    )
    .url(
      "Please insert an valid Youtube Url",
    );
  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");
  useEffect(() => {
    setUrl("");
    setErrorMessage("");
  }, [menuOpen]);
  return (
    <Dialog open={menuOpen}>
      <DialogTitle id="draggable-dialog-title">
        Create Course
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Just add a new Fitness Course
          to start with, just enter the
          Address of an YouTube Video
        </DialogContentText>
        <TextField
          required
          onChange={({
            target: { value },
          }) => {
            validation
              .validate(value)
              .catch(
                ({
                  errors,
                }: yup.ValidationError) => {
                  setErrorMessage(
                    errors.length > 0
                      ? errors[0]
                      : "",
                  );
                },
              );
            setUrl(value);
          }}
          error={errorMessage !== ""}
          helperText={errorMessage}
          variant="outlined"
          placeholder="https://www.youtube.com/watch?v=I3OIbbuZ1XE"
          label="Youtube URL"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            toggle();
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={async (event) => {
            try {
              event.preventDefault();
              if (errorMessage !== "") {
                logger.info(
                  `Please insert an valid Youtube Url, not "${url}"`,
                );
                return;
              }
              const {
                title,
                thumbnailUrl,
                url: youtubeUrl,
              } = await youtubeService.getMetadataForVideo(
                url,
              );
              logger.debug(
                `Resolved Youtube Video Metas title:"${title}", thumbnailUrl:"${thumbnailUrl}" for "${url}" `,
              );
              const course = new Course(
                title,
                youtubeUrl,
                thumbnailUrl,
              );
              logger.debug(
                "Created new Course",
              );

              await CourseRepository.save(
                course,
              );

              logger.debug(
                "Created new Course",
              );
              await queryClient.invalidateQueries(
                Query.courses,
              );
              toggle();
              logger.debug(
                "Hide CreateCoursemenu again",
              );
            } catch (err) {
              logger.error(
                "Something went wrong while adding new Course",
                err,
              );
            }
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCourseMenu;
