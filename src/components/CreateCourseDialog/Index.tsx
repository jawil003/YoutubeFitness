import React, {
  useEffect,
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
import Video from "src/entities/video.entity";

interface Props {}

/**
 * An CreateCourseDialog React Component.
 * @author Jannik Will
 * @version 0.1
 */
const CreateCourseDialog: React.FC<Props> = () => {
  const [
    courseError,
    setCourseError,
  ] = useState({ titleError: "" });
  const {
    menuOpen,
    toggle,
    data,
    setData,
  } = useFabContext();
  useEffect(() => {
    if (menuOpen) {
      setValues({
        course: {
          title: data.title,
          id: data.id,
        },
        videos: [...data.videos],
      });
      setData({
        id: undefined,
        title: "",
        videos: [],
      });
    }
  }, [menuOpen]);
  const [
    activeStep,
    setActiveStep,
  ] = useState<0 | 1>(0);
  const [values, setValues] = useState<{
    course: {
      title: string;
      id?: number;
    };
    videos: (Video & {
      begin: number;
      end: number;
    })[];
  }>({
    course: { title: "" },
    videos: [],
  });
  const [completed] = useState([
    false,
    false,
  ]);
  const resetState = () => {
    setValues({
      course: {
        title: "",
        id: undefined,
      },
      videos: [],
    });
    setActiveStep(0);
    setCourseError({ titleError: "" });
  };

  const handleClose = () => {
    toggle();
    resetState();
  };
  return (
    <DialogStepperContext.Provider
      value={{
        activeStep,
        courseError,
        setCourseError,
        ...values,
        setValues,
        setActiveStep,
        reset: resetState,
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
              return <AddCourseMenu />;
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
