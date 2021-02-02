import { css } from "@emotion/react";
import React from "react";

interface Props {
  name: string;
  icon: JSX.Element;
}

/**
 * An BottomNavBarItem React Component.
 * @author Jannik Will
 * @version 0.1
 */
const BottomNavBarItem: React.FC<Props> = ({ icon, name }) => {
  return (
    <div
      css={css`
        & {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        & > svg {
          flex: 1;
        }
        & > span {
          height: auto;
        }
      `}
    >
      {icon} <span>{name}</span>
    </div>
  );
};

export default BottomNavBarItem;
