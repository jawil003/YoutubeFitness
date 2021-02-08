import { css } from "@emotion/react";
import Head from "next/head";
import React from "react";
import EmptyCoursesPlaceholder from "../components/EmptyCoursesPlaceholder";
import FlexContainer from "../components/FlexContainer";
import designSystem from "../styles/designSystem";
import { generateIndividualTags } from "../services/frontend/meta.service";

/**
 * An MyCoursePage React Component.
 * @author
 * @version 0.1
 */
const MyCoursePage: React.FC = () => {
  return (
    <>
      <Head>
        {generateIndividualTags({
          accentColor:
            designSystem.colors.brand
              .primary,
          author: "Jannik Will",
          language: "en",
          title: "My Courses",
        })}
      </Head>

      {/*<div
        css={css`
          & {
            display: grid;
            grid-template-columns: repeat(
              auto-fill,
              minmax(371px, auto)
            );
            grid-template-rows: 140px;
            justify-content: center;
            align-items: start;
            justify-items: center;
            height: 100%;
            gap: 20px;
            padding: 40px;
          }
        `}
        ></div>*/}
      <FlexContainer
        css={css`
          & {
            height: 100%;
          }
        `}
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <EmptyCoursesPlaceholder />
      </FlexContainer>
    </>
  );
};

export default MyCoursePage;
