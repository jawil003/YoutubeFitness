import React, { useMemo } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { dot } from "../config/routes.json";
import Link from "next/link";
import { css } from "@emotion/react";

const generateItems = (
  items: Array<{
    name: string;
    url?: string;
    onClick?: () => Promise<void>;
  }>,
  handleClose: () => void,
) => {
  return items.map(
    ({ name, onClick, url }) =>
      url ? (
        <Link
          key={`${name}-link`}
          href={url}
        >
          <MenuItem
            css={css`
              & {
                width: 100%;
              }
            `}
            component="a"
            key={`${name}-menuItem`}
            onClick={handleClose}
          >
            {name}
          </MenuItem>
        </Link>
      ) : onClick ? (
        <MenuItem
          css={css`
            && {
              width: 100%;
            }
          `}
          component="button"
          key={`${name}-menuItem`}
          onClick={async () => {
            await onClick();
            handleClose();
          }}
        >
          {name}
        </MenuItem>
      ) : (
        <MenuItem
          component="button"
          key={`${name}-menuItem`}
          onClick={() => {
            handleClose();
          }}
        >
          {name}
        </MenuItem>
      ),
  );
};

interface Props {
  items?: Array<{
    name: string;
    url?: string;
    onClick?: () => Promise<void>;
  }>;
}

/**
 * An ThreeDotMenu React Component.
 * @author Jannik Will
 * @version 0.1
 */
const ThreeDotMenu: React.FC<Props> = ({
  items,
}) => {
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
        css={css`
          & {
            width: 100%;
          }
        `}
        id="simple-menu"
        variant="selectedMenu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {useMemo(
          () =>
            generateItems(
              items as Array<{
                name: string;
                url?: string;
                onClick?: () => Promise<void>;
              }>,
              handleClose,
            ),
          [items],
        )}
      </Menu>
    </>
  );
};

ThreeDotMenu.defaultProps = {
  items: dot,
};

export default ThreeDotMenu;
