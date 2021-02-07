import React from "react";
import {
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { dot } from "../config/routes.json";

const generateItems = (
  items: Array<{ name: string }>,
  handleClose: () => void,
) => {
  return items.map((i) => (
    <MenuItem
      key={`${i.name}-menuItem`}
      onClick={handleClose}
    >
      {i.name}
    </MenuItem>
  ));
};

interface Props {}

/**
 * An ThreeDotMenu React Component.
 * @author Jannik Will
 * @version 0.1
 */
const ThreeDotMenu: React.FC<Props> = () => {
  const [
    anchorEl,
    setAnchorEl,
  ] = React.useState<null | HTMLElement>(
    null,
  );

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        variant="selectedMenu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {generateItems(
          dot,
          handleClose,
        )}
      </Menu>
    </>
  );
};

export default ThreeDotMenu;
