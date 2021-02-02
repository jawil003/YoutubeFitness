import { css } from "@emotion/react";
import Head from "next/head";
import React from "react";
import Course from "../components/Course";
import FlexContainer from "../components/FlexContainer";

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
      <FlexContainer
        css={css`
          & {
            width: 100%;
            height: 100%;
          }
        `}
        alignItems="center"
        justifyContent="center"
      >
        <FlexContainer wrap alignItems="center" columnGap="20px" rowGap="20px">
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
          <Course
            title="Test"
            imageUrl="https://images.unsplash.com/photo-1518611012118-696072aa579a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
            url="https://google.de/"
          />
        </FlexContainer>
      </FlexContainer>
    </>
  );
};

export default MyCoursePage;
