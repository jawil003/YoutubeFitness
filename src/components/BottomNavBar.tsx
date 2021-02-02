import React from "react";
import { css } from "@emotion/react";
import designSystem from "../styles/designSystem";

interface Props {}

/**
 * An BottomNavBar React Component.
 * @author Jannik Will
 * @version 0.1
 */
const BottomNavBar: React.FC<Props> = () => {
  return (
    <footer
      css={css`
        & {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 72px;
          display: flex;
          background-color: ${designSystem.colors.brand.primary};
          filter: drop-shadow(0px -2px 2px rgba(0, 0, 0, 0.25));
        }
      `}
    ></footer>
  );
};

export default BottomNavBar;
