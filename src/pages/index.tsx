import { css } from "@emotion/react";
import Head from "next/head";
import React from "react";
import designSystem from "src/styles/designSystem";
import Course from "../components/Course";
import { generateIndividualTags } from "../services/meta.service";

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

      <div
        css={css`
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
        `}
      >
        <Course youtubeVideoUrl="https://www.youtube.com/watch?v=-YJXpabrX4k" />
      </div>
    </>
  );
};

export default MyCoursePage;
