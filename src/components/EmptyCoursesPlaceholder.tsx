import { css } from "@emotion/react";
import { Typography } from "@material-ui/core";
import React from "react";
import EmptyParcelManDesign from "../designs/EmptyParcelMan.design";
import designSystem from "../styles/designSystem";

/**
 * An EmptyCoursesPlaceholder React Component.
 * @author Jannik Will
 * @version 0.1
 */
const EmptyCoursesPlaceholder: React.FC = () => {
  return (
    <div
      css={css`
        & {
          display: inline-block;
          margin: 0;
        }
      `}
    >
      <EmptyParcelManDesign
        width="277px"
        height="255px"
        color={
          designSystem.colors.brand
            .secondary
        }
      />
      <Typography
        align="center"
        css={css`
          & {
            color: rgba(0, 0, 0, 0.45);
            width: 0;
            min-width: 100%;
          }
        `}
        variant="body2"
      >
        It is empty here, go add your
        first Course just press the Add
        Button
      </Typography>
    </div>
  );
};

export default EmptyCoursesPlaceholder;
