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

/**
 * An OverlayMenu React Component.
 * @author Jannik Will
 * @version 0.1
 */
const CreateCourseMenu: React.FC = () => {
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
                    errors[0],
                  );
                },
              );
          }}
          error={errorMessage !== ""}
          helperText={errorMessage}
          variant="outlined"
          placeholder="https://www.youtube.com/watch?v=I3OIbbuZ1XE"
          label="Youtube URL"
          fullWidth
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
          onClick={(event) => {
            event.preventDefault();
            if (errorMessage !== "")
              return;
            //TODO: Add Code to save the Video in IndexDB Database here
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCourseMenu;
