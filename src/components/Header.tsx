import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import designSystem from "../styles/designSystem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { IconButton, Menu, MenuItem } from "@material-ui/core";

/**
 * An Header React Component.
 * @author Jannik Will
 * @version 0.1
 */
const Header: React.FC = () => {
  const [title, setTitle] = useState("Title");
  const threeDotButton = React.createRef<HTMLAnchorElement>();
  useEffect(() => {
    if (typeof window !== "undefined" && document.title !== "")
      setTitle(document?.title);
  });
  return (
    <header
      css={css`
        & {
          position: sticky;
          margin-top: 10px;
          top: 0;
          left: 0;
          right: 0;
          height: 56px;
          width: 100%;
          display: flex;
          align-items: center;
          padding: 10px 20px;
        }
        & > span {
          font-weight: ${designSystem.font.fontWeight.semiBold};
          font-size: 22px;
        }
      `}
    >
      <span>{title}</span>
      <div className="flex-spacer" />
      <IconButton ref={threeDotButton as any}>
        <MoreVertIcon />
      </IconButton>
      <Menu id="simple-menu" keepMounted open>
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </header>
  );
};

export default Header;
