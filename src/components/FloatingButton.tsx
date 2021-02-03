import React, { VoidFunctionComponent } from "react";
import AddIcon from "@material-ui/icons/Add";
import { css } from "@emotion/react";
import designSystem from "../styles/designSystem";
import { Fab } from "@material-ui/core";

interface Props {
  className?: string;
  onPress?: () => void;
}

/**
 * An FloatingButton React Component.
 * @author Jannik Will
 * @version 0.1
 */
const FloatingButton: React.FC<Props> = ({ className, onPress }) => {
  return (
    <Fab
      onClick={onPress}
      color="primary"
      aria-label="add"
      className={className}
      css={css`
        &.MuiFab-primary.MuiFab-primary {
          width: 56px;
          height: 56px;
          background-color: ${designSystem.colors.brand.secondary};
          position: relative;
        }
      `}
    >
      <AddIcon />
    </Fab>
  );
};

export default FloatingButton;
