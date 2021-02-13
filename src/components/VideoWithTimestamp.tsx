import { css } from "@emotion/react";
import React from "react";
import designSystem from "src/styles/designSystem";

interface Props {
  title: string;
  timestamp: string;
}

/**
 * An VideoWithTimestamp React Component.
 * @author Jannik Will
 * @version 0.1
 */
const VideoWithTimestamp: React.FC<Props> = ({
  title,
  timestamp,
}) => {
  return (
    <div
      css={css`
        & {
          display: flex;
          min-width: 300px;
          max-width: 300px;
          justify-content: center;
          align-items: center;
          min-height: 40px;
          filter: drop-shadow(
            2px 4px 16px
              rgba(0, 0, 0, 0.25)
          );
          padding: 10px 20px;
          border-radius: 18px;
          filter: drop-shadow(
            2px 4px 16px
              rgba(0, 0, 0, 0.25)
          );
          background-color: ${designSystem
            .colors.brand.primary};
        }
      `}
    >
      <span
        css={css`
          & {
            text-overflow: ellipsis;
            max-width: 150px;
            overflow-x: hidden;
          }
        `}
        className="title"
      >
        {title}
      </span>
      <div
        css={css`
          & {
            flex: 1;
          }
        `}
      />
      <span className="timestamp">
        {timestamp}
      </span>
    </div>
  );
};

export default VideoWithTimestamp;
