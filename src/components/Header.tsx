import { css } from "@emotion/react";
import React, {
  useEffect,
  useState,
} from "react";
import designSystem from "../styles/designSystem";
import ThreeDotMenu from "./ThreeDotMenu";
import FlexContainer from "./FlexContainer";
import { Typography } from "@material-ui/core";

/**
 * An Header React Component.
 * @author Jannik Will
 * @version 0.1
 */
const Header: React.FC = () => {
  const [title, setTitle] = useState(
    "Title",
  );

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      document.title !== ""
    )
      setTitle(
        document?.title.split(" |")[0],
      );
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
          font-weight: ${designSystem
            .font.fontWeight.semiBold};
          font-size: 22px;
        }
      `}
    >
      <FlexContainer
        alignItems="center"
        css={css`
          & svg.MuiSvgIcon-root {
            font-size: 25px;
          }
        `}
        columnGap="20px"
      >
        <Typography
          css={css`
            &.MuiTypography-root {
              font-weight: 500;
            }
          `}
          variant="h5"
          variantMapping={{
            h5: "h1",
          }}
        >
          {title}
        </Typography>
      </FlexContainer>
      <div className="flex-spacer" />
      <ThreeDotMenu />
    </header>
  );
};

export default Header;
