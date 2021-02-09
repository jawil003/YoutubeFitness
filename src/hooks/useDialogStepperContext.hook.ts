import { useContext } from "react";
import DialogStepperContext from "../contexts/DialogStepperContext";

const useDialogStepperContext = () =>
  useContext(DialogStepperContext);
export default useDialogStepperContext;
