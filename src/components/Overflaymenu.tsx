import { css } from "@emotion/react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import React from "react";
import useFabContext from "../hooks/useFabContext";
import designSystem from "../styles/designSystem";

/**
 * An OverlayMenu React Component.
 * @author Jannik Will
 * @version 0.1
 */
const OverlayMenu: React.FC = () => {
  const { menuOpen } = useFabContext();
  return (
    <div
      css={css`
        & {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: ${designSystem.positioning.first};
          justify-content: center;
          align-items: center;
        }
        & .MuiButton-label.MuiButton-label {
          text-transform: none;
        }
        & {
          display: ${menuOpen ? "flex" : "none"};
        }
      `}
    >
      <Card>
        <CardContent>
          <Typography variant="h5">Please Select</Typography>
        </CardContent>
        <CardActions>
          <Button>Add Course</Button>
          <Button>Add Activity</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default OverlayMenu;
