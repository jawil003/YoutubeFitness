import React from "react";
import Video from "src/entities/video.entity";

const DialogStepperContext = React.createContext<{
  activeStep: 0 | 1;
  course: {
    title: string;
    id?: number;
  };
  courseError: { titleError: string };
  setCourseError: React.Dispatch<
    React.SetStateAction<{
      titleError: string;
    }>
  >;
  videos: (Video & {
    begin: number;
    end: number;
  })[];
  setValues: React.Dispatch<
    React.SetStateAction<{
      course: {
        id?: number;
        title: string;
      };
      videos: (Video & {
        begin: number;
        end: number;
      })[];
    }>
  >;
  setActiveStep: React.Dispatch<
    React.SetStateAction<0 | 1>
  >;
  reset: () => void;
}>({
  activeStep: 0,
  course: { title: "" },
  courseError: { titleError: "" },
  setCourseError: () => {},
  videos: [],
  setValues: () => {},
  setActiveStep: () => {},
  reset: () => {},
});
export default DialogStepperContext;
