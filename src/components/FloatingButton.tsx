import React from "react";
import AddIcon from "@material-ui/icons/Add";
import {
  SpeedDial,
  SpeedDialAction,
} from "@material-ui/lab";
import SportsIcon from "@material-ui/icons/Sports";
import TimerIcon from "@material-ui/icons/Timer";
import { css } from "@emotion/react";
import designSystem from "src/styles/designSystem";

const actions = [
  {
    icon: <SportsIcon />,
    name: "Create Course",
  },
  {
    icon: <TimerIcon />,
    name: "Add Activity",
  },
];

interface Props {
  className?: string;
  onPress?: () => void;
}

/**
 * An FloatingButton React Component.
 * @author Jannik Will
 * @version 0.1
 */
const FloatingButton: React.FC<Props> = ({
  className,
}) => {
  const [
    open,
    setOpen,
  ] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
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
      <SpeedDial
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
        ariaLabel="SpeedDial example"
        icon={<AddIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="up"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
    </div>
  );
};

export default FloatingButton;
