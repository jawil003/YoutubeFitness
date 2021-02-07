import React, {
  Dispatch,
  SetStateAction,
} from "react";

const BottomAndHeaderContext = React.createContext<{
  headerOpen: boolean;
  bottomOpen: boolean;
  set: Dispatch<
    SetStateAction<{
      headerOpen: boolean;
      bottomOpen: boolean;
    }>
  >;
}>({
  bottomOpen: true,
  headerOpen: true,
  set: () => {},
});
export default BottomAndHeaderContext;
