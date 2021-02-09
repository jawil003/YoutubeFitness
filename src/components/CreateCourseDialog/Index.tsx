import React, { useState } from "react";
import {
  Dialog,
  Stepper,
  Step,
  StepLabel,
} from "@material-ui/core";
import useFabContext from "../../hooks/useFabContext";

//TODO: Finish the new DialogStepper

interface Props {}

/**
 * An CreateCourseDialog React Component.
 * @author Jannik Will
 * @version 0.1
 */
const CreateCourseDialog: React.FC<Props> = () => {
  const {
    menuOpen,
    toggle,
  } = useFabContext();
  const [
    activeStep,
    setActiveStep,
  ] = useState<0 | 1>(0);
  const [
    completed,
    setCompleted,
  ] = useState([false, false]);
  return (
    <Dialog open={menuOpen}>
      <Stepper activeStep={activeStep}>
        <Step completed={completed[0]}>
          <StepLabel>
            Create Course
          </StepLabel>
        </Step>
        <Step completed={completed[1]}>
          <StepLabel>
            Add Videos
          </StepLabel>
        </Step>
      </Stepper>
    </Dialog>
  );
};

export default CreateCourseDialog;
