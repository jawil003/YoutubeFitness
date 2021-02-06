import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";
import { css } from "@emotion/react";
import designSystem from "src/styles/designSystem";
import useFabContext from "src/hooks/useFabContext";

interface Props {
  className?: string;
}

/**
 * An FloatingButton React Component.
 * @author Jannik Will
 * @version 0.1
 */
const FloatingButton: React.FC<Props> = ({
  className,
}) => {
  const { toggle } = useFabContext();
  const handleClick = (
    _event: React.MouseEvent<
      HTMLButtonElement,
      MouseEvent
    >,
  ) => {
    toggle();
  };
  return (
    <div
      className={className}
      css={css`
        & {
          position: absolute;
          bottom: 38px;
        }
      `}
    >
      <Fab
        css={css`
          & > button {
            background-color: ${designSystem
              .colors.brand.secondary};
          }
          & > button:hover {
            background-color: ${designSystem
              .colors.brand
              .secondaryDark};
          }
          & > button svg {
            fill: ${designSystem.colors
              .brand.primary};
          }
        `}
        onClick={handleClick}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default FloatingButton;
