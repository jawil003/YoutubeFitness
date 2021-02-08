import { css } from "@emotion/react";
import React from "react";

interface Props {
  direction?: "row" | "column";
  columnGap?: string;
  rowGap?: string;
  alignContent?:
    | "space-around"
    | "space-between"
    | "center"
    | "flex-start"
    | "flex-end";
  justifyContent?:
    | "space-around"
    | "space-between"
    | "center"
    | "flex-start"
    | "flex-end";
  alignItems?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "stretch";
  alignSelf?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "stretch";
  justifySelf?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "stretch";
  wrap?: boolean;
  className?: string;
  inline?: boolean;
}

/**
 * An FlexContainer React Component.
 * @author Jannik Will
 * @version 0.1
 */
const FlexContainer: React.FC<Props> = ({
  inline,
  direction,
  columnGap,
  rowGap,
  justifyContent,
  alignItems,
  alignContent,
  wrap,
  children,
  alignSelf,
  justifySelf,
  className,
}) => {
  return (
    <div
      role="flex-box"
      css={css`
        & {
          display: ${inline
            ? "inline-flex"
            : "flex"};
          align-self: ${alignSelf};
          justify-self: ${justifySelf};
          flex-direction: ${direction};
          align-content: ${alignContent};
          justify-content: ${justifyContent};
          align-items: ${alignItems};
          flex-wrap: ${wrap
            ? "wrap"
            : "no-wrap"};
          margin: calc(${rowGap} / -2)
            calc(${columnGap} / -2);
        }
        & > * {
          margin: calc(${rowGap} / 2)
            calc(${columnGap} / 2);
        }
      `}
      className={className}
    >
      {children}
    </div>
  );
};

FlexContainer.defaultProps = {
  wrap: false,
  direction: "row",
  columnGap: "0px",
  rowGap: "0px",
  inline: false,
};

export default FlexContainer;
