import React, {
  useMemo,
  useState,
} from "react";
import {
  Dialog,
  Stepper,
  Step,
  StepLabel,
  IconButton,
} from "@material-ui/core";
import useFabContext from "../../hooks/useFabContext";
import AddCourseMenu from "./AddCourseMenu";
import AddVideoMenu from "./AddVideoMenu";
import CloseIcon from "@material-ui/icons/Close";
import FlexContainer from "../FlexContainer";
import DialogStepperContext from "../../contexts/DialogStepperContext";

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
  const [values, setValues] = useState({
    course: { title: "" },
    videos: [],
  });
  const [
    completed,
    setCompleted,
  ] = useState([false, false]);
  const handleClose = () => toggle();
  return (
    <DialogStepperContext.Provider
      value={{
        activeStep,
        ...values,
        setValues,
        setActiveStep,
      }}
    >
      <Dialog open={menuOpen}>
        <FlexContainer>
          <IconButton
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </FlexContainer>
        <Stepper
          activeStep={activeStep}
        >
          <Step
            completed={completed[0]}
          >
            <StepLabel>
              Create Course
            </StepLabel>
          </Step>
          <Step
            completed={completed[1]}
          >
            <StepLabel>
              Add Videos
            </StepLabel>
          </Step>
        </Stepper>
        {useMemo(() => {
          switch (activeStep) {
            case 0: {
              return (
                <AddCourseMenu
                  onNextPressed={() =>
                    setActiveStep(1)
                  }
                />
              );
            }
            case 1: {
              return <AddVideoMenu />;
            }
          }
        }, [activeStep])}
      </Dialog>
    </DialogStepperContext.Provider>
  );
};

export default CreateCourseDialog;
