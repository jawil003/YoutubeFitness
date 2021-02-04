import { useContext } from "react";
import FloatingButtonContext from "../contexts/FloatingButtonContext";

const useFabContext = () =>
  useContext(FloatingButtonContext);
export default useFabContext;
