import React from "react";

const DialogStepperContext = React.createContext(
  {
    step: 0 | 1,
    next: () => {},
    previous: () => {},
  },
);
export default DialogStepperContext;
