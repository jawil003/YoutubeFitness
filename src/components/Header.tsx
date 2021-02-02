import { css } from "@emotion/react";
import React from "react";

interface Props {
  name: string;
}

/**
 * An Header React Component.
 * @author Jannik Will
 * @version 0.1
 */
const Header: React.FC<Props> = ({ name }) => {
  return (
    <header
      css={css`
        & {
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          height: 56px;
          width: 100%;
        }
        & > span {
          font-weight: bold;
        }
      `}
    >
      <span>{name}</span>
    </header>
  );
};

export default Header;
