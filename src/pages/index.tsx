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
        <Course
          youtubeVideoUrl="https://www.youtube.com/watch?v=PU-9fdFrWq4"
          url="https://google.de/"
        />
        <Course
          title="Test"
          imageUrl="https://images.unsplash.com/photo-1518611012118-696072aa579a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
          url="https://google.de/"
        />
        <Course
          title="Test"
          imageUrl="https://images.unsplash.com/photo-1518611012118-696072aa579a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
          url="https://google.de/"
        />
        <Course
          title="Test"
          imageUrl="https://images.unsplash.com/photo-1518611012118-696072aa579a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
          url="https://google.de/"
        />
      </div>
    </>
  );
};

export default MyCoursePage;
