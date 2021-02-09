import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from "@material-ui/core";
import React from "react";
import useDialogStepperContext from "../../hooks/useDialogStepperContext.hook";
import * as yup from "yup";
import { ValidationError } from "yup";
/**
 * An AddCourseMenu React Component.
 * @author Jannik Will
 * @version 0.1
 */
const AddCourseMenu: React.FC = () => {
  const courseNameSchema = yup
    .string()
    .required(
      "Please insert an Name for a Fitness Course",
    );
  const {
    setActiveStep,
    course: { title },
    courseError: { titleError },
    setCourseError,
    setValues,
  } = useDialogStepperContext();
  return (
    <>
      <DialogContent>
        <DialogContentText>
          Just add a new Fitness Course
          to start with, just enter a
          name and continue.
        </DialogContentText>
        <TextField
          value={title}
          onChange={async ({
            target: { value: title },
          }) => {
            try {
              await courseNameSchema.validate(
                title,
              );
              setCourseError({
                titleError: "",
              });
            } catch (err) {
              setCourseError({
                titleError: (err as ValidationError)
                  .errors[0],
              });
            } finally {
              setValues((prev) => ({
                ...prev,
                course: { title },
              }));
            }
          }}
          autoFocus
          helperText={titleError}
          error={titleError != ""}
          required
          fullWidth
          variant="outlined"
          label="Name"
          placeholder="Full Body Workout"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          disabled={
            titleError != "" ||
            title === ""
          }
          onClick={() =>
            setActiveStep(1)
          }
        >
          Next
        </Button>
      </DialogActions>
    </>
  );
};

export default AddCourseMenu;
