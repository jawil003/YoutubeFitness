import { css } from "@emotion/react";
import Head from "next/head";
import React from "react";
import Course from "../components/Course";

/**
 * An MyCoursePage React Component.
 * @author
 * @version 0.1
 */
const MyCoursePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>My Courses</title>
      </Head>

      <div
        css={css`
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(371px, auto));
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
