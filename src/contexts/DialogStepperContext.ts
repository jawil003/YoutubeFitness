import React from "react";

const DialogStepperContext = React.createContext<{
  activeStep: 0 | 1;
  course: { title: string };
  videos: { url: string }[];
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
}>({
  activeStep: 0,
  course: { title: "" },
  videos: [],
  setValues: () => {},
  setActiveStep: () => {},
});
export default DialogStepperContext;
