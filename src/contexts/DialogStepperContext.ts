import React from "react";

const DialogStepperContext = React.createContext<{
  activeStep: 0 | 1;
  course: { title: string };
  courseError: { titleError: string };
  setCourseError: React.Dispatch<
    React.SetStateAction<{
      titleError: string;
    }>
  >;
  videos: { url: string }[];
  videosError: { urlError: string };
  setVideosError: React.Dispatch<
    React.SetStateAction<{
      urlError: string;
    }>
  >;
  setValues: React.Dispatch<
    React.SetStateAction<{
      course: {
        title: string;
      };
      videos: { url: string }[];
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
  videosError: { urlError: "" },
  setVideosError: () => {},
  setValues: () => {},
  setActiveStep: () => {},
  reset: () => {},
});
export default DialogStepperContext;
