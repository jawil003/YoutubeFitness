import { css } from "@emotion/react";
import React from "react";
import TimeConverterService from "src/services/frontend/timeConverter.service";
import designSystem from "src/styles/designSystem";

interface Props {
  title: string;
  timestamp: number;
  current?: boolean;
}

/**
 * An VideoWithTimestamp React Component.
 * @author Jannik Will
 * @version 0.1
 */
const VideoWithTimestamp: React.FC<Props> = ({
  title,
  timestamp,
  current,
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
          filter: ${current
            ? undefined
            : "drop-shadow(2px 4px 16px rgba(0, 0, 0, 0.25))"};
          padding: 10px 20px;
          border-radius: 18px;
          background-color: ${current
            ? designSystem.colors.brand
                .secondary
            : designSystem.colors.brand
                .primary};
          color: ${current
            ? designSystem.colors.brand
                .primary
            : designSystem.colors.brand
                .secondaryText};
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
        {TimeConverterService.secondsToHHMMSS(
          timestamp,
        )}
      </span>
    </div>
  );
};

VideoWithTimestamp.defaultProps = {
  current: false,
};

export default VideoWithTimestamp;
