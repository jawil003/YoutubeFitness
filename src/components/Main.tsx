import { css } from "@emotion/react";
import React from "react";

interface Props {}

/**
 * An Main React Component.
 * @author Jannik Will
 * @version 0.1
 */
const Main: React.FC<Props> = ({
  children,
}) => {
  return (
    <main
      css={css`
        & {
          flex: 1;
        }
      `}
    >
      {children}
    </main>
  );
};

export default Main;
