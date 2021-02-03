import {
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  FilledTextFieldProps,
  OutlinedTextFieldProps,
  StandardTextFieldProps,
} from "@material-ui/core";
import React, { useState } from "react";
import useFabContext from "../hooks/useFabContext";
import CloseIcon from "@material-ui/icons/Close";
import FlexContainer from "./FlexContainer";
import Autocomplete from "@material-ui/lab/Autocomplete";
import NoEmbedService from "../services/NoEmbedService";
import { db } from "../store/LocalAppStorage";
import Course from "../entities/course.entitiy";

const evaluateWhichWIndowShown = (
  navigationState: string,
  toggle: () => void,
  setNavigationState: React.Dispatch<
    React.SetStateAction<"main" | "action" | "activity">
  >
) => {
  const [url, setUrl] = useState("");

  switch (navigationState) {
    default: {
      return [
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Select Action
        </DialogTitle>,
        <DialogContent>
          <DialogContentText>
            Decide to either create a new Course from an Youtube Vide or add an
            specific requirement of Times you want to do the exercise
          </DialogContentText>
        </DialogContent>,
        <DialogActions>
          <Button onClick={() => setNavigationState("action")}>
            Create Course
          </Button>
          <Button onClick={() => setNavigationState("activity")}>
            Add Activity
          </Button>
        </DialogActions>,
      ];
    }
    case "action": {
      return [
        <DialogContent>
          <DialogContentText>
            To add a new Course to start with, just enter the Adress of an
            fitting YouTube Video
          </DialogContentText>
          <TextField
            value={url}
            onChange={({ target: { value } }) => {
              setUrl(value);
            }}
            autoFocus
            margin="dense"
            id="youtube_url"
            label="Youtube Url"
            type="url"
            fullWidth
          />
        </DialogContent>,
        <DialogActions>
          <Button onClick={() => setNavigationState("main")}>Go Back</Button>
          <Button
            onClick={async () => {
              toggle();
              const {
                data: { thumbnail_url, title, url: pageUrl },
              } = await new NoEmbedService().getMetaDataByYoutubeUrl(url);
              await db.transaction("rw", db.courses, async () => {
                await db.courses.add(new Course(title, pageUrl, thumbnail_url));
              });
            }}
          >
            Finish
          </Button>
        </DialogActions>,
      ];
    }
    case "activity": {
      return [
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Add Activity
        </DialogTitle>,
        <DialogContent>
          <DialogContentText>
            To add a new Course to start with, just enter the Adress of an
            fitting YouTube Video
          </DialogContentText>
          <Autocomplete
            id="combo-box-demo"
            options={["Example", "Example3"]}
            getOptionLabel={(option: string) => option}
            style={{ width: 300 }}
            renderInput={(
              params:
                | (JSX.IntrinsicAttributes & StandardTextFieldProps)
                | (JSX.IntrinsicAttributes & FilledTextFieldProps)
                | (JSX.IntrinsicAttributes & OutlinedTextFieldProps)
            ) => (
              <TextField {...params} label="Select Course" variant="outlined" />
            )}
          />
        </DialogContent>,
        <DialogActions>
          <Button onClick={() => setNavigationState("main")}>Go Back</Button>
        </DialogActions>,
      ];
    }
  }
};

/**
 * An OverlayMenu React Component.
 * @author Jannik Will
 * @version 0.1
 */
const OverlayMenu: React.FC = () => {
  const { menuOpen, toggle } = useFabContext();
  const [navigationState, setNavigationState] = useState<
    "main" | "action" | "activity"
  >("main");
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
      {[
        ...evaluateWhichWIndowShown(
          navigationState,
          toggle,
          setNavigationState
        ),
      ]}
    </Dialog>
  );
};

export default OverlayMenu;