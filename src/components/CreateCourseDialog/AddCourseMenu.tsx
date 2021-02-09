import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from "@material-ui/core";
import React from "react";
import useDialogStepperContext from "../../hooks/useDialogStepperContext.hook";

/**
 * An AddCourseMenu React Component.
 * @author Jannik Will
 * @version 0.1
 */
const AddCourseMenu: React.FC = () => {
  const {
    setActiveStep,
    course: { title },
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
          onChange={({
            target: { value: title },
          }) =>
            setValues((prev) => ({
              ...prev,
              course: { title },
            }))
          }
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
