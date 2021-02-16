import { css } from "@emotion/react";
import {
  Button,
  Typography,
} from "@material-ui/core";
import React from "react";
import FlexContainer from "./FlexContainer";
import DeveloperDesign from "src/designs/Developer.design";
import FavoriteIcon from "@material-ui/icons/Favorite";
import designSystem from "../styles/designSystem";

/**
 * An AboutDialog React Component.
 * @author Jannik Will
 * @version 0.1
 */
const AboutDialog: React.FC = () => {
  return (
    <>
      <FlexContainer
        alignItems="center"
        css={css`
          & {
            min-height: 100%;
            min-width: 100%;
          }
        `}
      >
        <FlexContainer
          justifyContent="center"
          css={css`
            & {
              flex: 1;
              min-height: 100%;
            }
          `}
        >
          <DeveloperDesign
            css={css`
              & {
                max-width: 350px;
              }
            `}
            width="100%"
          />
        </FlexContainer>
        <FlexContainer
          alignItems="center"
          direction="column"
          rowGap="10px"
          css={css`
            & {
              flex: 1;
              min-height: 100%;
            }
          `}
        >
          <Typography
            css={css`
              && {
                font-size: 1.65rem;
                font-weight: 500;
                max-width: 250px;
                text-align: center;
              }
            `}
          >
            Created with {"</>"} and{" "}
            {
              <FavoriteIcon
                css={css`
                  && {
                    font-size: 1.4em;
                    position: relative;
                    top: 0.2em;
                    fill: ${designSystem
                      .colors.palette
                      .red.base};
                    margin: 0px 5px;
                  }
                `}
              />
            }{" "}
            from Germany
          </Typography>
          <Typography>
            &copy; Jannik Will
          </Typography>
          <div
            css={css`
              & {
                height: 10px;
              }
            `}
          />
          <Button
            href="mailto:"
            variant="contained"
          >
            Contact Me
          </Button>
        </FlexContainer>
      </FlexContainer>
    </>
  );
};

export default AboutDialog;
