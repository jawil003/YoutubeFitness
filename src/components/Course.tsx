import { css } from "@emotion/react";
import React from "react";
import designSystem from "../styles/designSystem";

interface Props {
  title: string;
  thumbnailUrl: string;
}

/**
 * An Course React Component.
 * @author Jannik Will
 * @version 0.1
 */
const Course: React.FC<Props> = ({
  title,
  thumbnailUrl,
}) => {
  return (
    <div
      css={css`
        & {
          filter: drop-shadow(
            2px 4px 16px
              rgba(0, 0, 0, 0.25)
          );
          background-color: ${designSystem
            .colors.brand.primary};
          border-radius: 18px;
          width: 371px;
          height: 140px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }
        & > div {
          height: 100%;
          width: 155px;
          overflow: hidden;
          position: relative;
        }
        & > div > img {
          height: 100%;
          filter: blur(2px);
        }
        & > div > img ~ div {
          display: flex;
          width: 100%;
          height: 100%;
        }
        & > span {
          flex: 1;
          padding: 20px 40px;
          text-align: center;
        }
      `}
    >
      <div>
        <img
          src={thumbnailUrl}
          alt={title + "-image"}
        />
        <div></div>
      </div>
      <span>{title}</span>
    </div>
  );
};

export default Course;
