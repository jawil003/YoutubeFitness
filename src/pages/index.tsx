import { css } from "@emotion/react";
import Head from "next/head";
import React from "react";
import EmptyCoursesPlaceholder from "../components/EmptyCoursesPlaceholder";
import FlexContainer from "../components/FlexContainer";
import designSystem from "../styles/designSystem";
import { generateIndividualTags } from "../services/frontend/meta.service";
import CourseRepository from "src/services/frontend/courseRepository.service";
import Course from "src/components/Course";
import { useQuery } from "react-query";
import { CircularProgress } from "@material-ui/core";
import { Query } from "../config/reactQuery.enum";

/**
 * An MyCoursePage React Component.
 * @author
 * @version 0.1
 */
const MyCoursePage: React.FC = () => {
  const {
    data: courses,
    isFetched,
  } = useQuery(
    Query.courses,
    async () => {
      const courses = await CourseRepository.findAll();
      for (const course of courses) {
        await CourseRepository.resolveVideos(
          course,
        );
      }
      return courses;
    },
  );

  return (
    <>
      <Head>
        {generateIndividualTags({
          description:
            "Create and edit Courses based on your favourite YouTube Videos and create a Playlist for your Workout just in a few Steps. All for free.",
          accentColor:
            designSystem.colors.brand
              .primary,
          author: "Jannik Will",
          language: "en",
          title: "My Courses",
        })}
      </Head>

      {isFetched &&
      courses &&
      courses.length > 0 ? (
        <div
          css={css`
            @media (min-width: 500px) {
              & {
                grid-template-columns: repeat(
                  auto-fill,
                  371px
                );
              }
            }
            @media (max-width: 500px) {
              & {
                grid-template-columns: 1fr;
              }
            }
            & {
              display: grid;
              justify-content: space-around;
              align-content: flex-start;
              align-items: start;

              height: 100%;
              gap: 20px;
              padding: 40px;
            }
          `}
        >
          {courses.map(
            ({ id, title, videos }) => (
              <Course
                id={id}
                title={title}
                videos={videos as any}
              />
            ),
          )}
        </div>
      ) : (
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
          {isFetched ? (
            <EmptyCoursesPlaceholder />
          ) : (
            <CircularProgress color="secondary" />
          )}
        </FlexContainer>
      )}
    </>
  );
};

export default MyCoursePage;
