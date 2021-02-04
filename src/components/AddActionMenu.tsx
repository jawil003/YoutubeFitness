import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  FilledTextFieldProps,
  OutlinedTextFieldProps,
  StandardTextFieldProps,
} from "@material-ui/core";
import React from "react";
import useFabContext from "../hooks/useFabContext";
import CloseIcon from "@material-ui/icons/Close";
import FlexContainer from "./FlexContainer";
import Autocomplete from "@material-ui/lab/Autocomplete";

/**
 * An OverlayMenu React Component.
 * @author Jannik Will
 * @version 0.1
 */
const CreateCourseMenu: React.FC = () => {
  const {
    menuOpen,
    toggle,
  } = useFabContext();
  return (
    <Dialog open={menuOpen}>
      <FlexContainer>
        <IconButton
          onClick={() => {
            toggle();
          }}
        >
          <CloseIcon />
        </IconButton>
      </FlexContainer>
      <DialogTitle
        style={{ cursor: "move" }}
        id="draggable-dialog-title"
      >
        Add Activity
      </DialogTitle>
      ,
      <DialogContent>
        <DialogContentText>
          To add a new Course to start
          with, just enter the Adress of
          an fitting YouTube Video
        </DialogContentText>
        <Autocomplete
          id="combo-box-demo"
          options={[
            "Example",
            "Example3",
          ]}
          getOptionLabel={(
            option: string,
          ) => option}
          style={{ width: 300 }}
          renderInput={(
            params:
              | (JSX.IntrinsicAttributes &
                  StandardTextFieldProps)
              | (JSX.IntrinsicAttributes &
                  FilledTextFieldProps)
              | (JSX.IntrinsicAttributes &
                  OutlinedTextFieldProps),
          ) => (
            <TextField
              {...params}
              label="Select Course"
              variant="outlined"
            />
          )}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateCourseMenu;
