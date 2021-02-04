import {
  Button,
  IconButton,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import FlexContainer from "./FlexContainer";
import NoEmbedService from "../services/NoEmbedService";
import { db } from "../store/LocalAppStorage";
import Course from "../entities/course.entitiy";

interface Props {
  hidden: boolean;
  toggleVisibility: () => void;
}

/**
 * An OverlayMenu React Component.
 * @author Jannik Will
 * @version 0.1
 */
const CreateCourseMenu: React.FC<Props> = ({
  hidden,
  toggleVisibility,
}) => {
  const [url, setUrl] = useState("");

  return (
    <Dialog open={!hidden}>
      <FlexContainer>
        <IconButton
          onClick={() => {
            toggleVisibility();
          }}
        >
          <CloseIcon />
        </IconButton>
      </FlexContainer>
      <DialogContent>
        <DialogContentText>
          To add a new Course to start
          with, just enter the Adress of
          an fitting YouTube Video
        </DialogContentText>
        <TextField
          value={url}
          onChange={({
            target: { value },
          }) => {
            setUrl(value);
          }}
          autoFocus
          margin="dense"
          id="youtube_url"
          label="Youtube Url"
          type="url"
          fullWidth
        />
      </DialogContent>

      <DialogActions>
        <Button
          onClick={async () => {
            toggleVisibility();
            const {
              data: {
                thumbnail_url,
                title,
                url: pageUrl,
              },
            } = await new NoEmbedService().getMetaDataByYoutubeUrl(
              url,
            );
            await db.transaction(
              "rw",
              db.courses,
              async () => {
                await db.courses.add(
                  new Course(
                    title,
                    pageUrl,
                    thumbnail_url,
                  ),
                );
              },
            );
          }}
        >
          Finish
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCourseMenu;
