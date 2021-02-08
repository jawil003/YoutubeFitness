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
    "courses",
    async () =>
      await CourseRepository.getAll(),
  );

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

      {isFetched && courses ? (
        <div
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
        >
          {courses.map(
            ({
              thumbnailUrl,
              title,
            }) => (
              <Course
                title={title}
                thumbnailUrl={
                  thumbnailUrl
                }
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
