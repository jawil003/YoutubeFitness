import { useContext } from "react";
import IntentContext from "src/contexts/IntentContext";

const useIntentContext = () =>
  useContext(IntentContext);
export default useIntentContext;
