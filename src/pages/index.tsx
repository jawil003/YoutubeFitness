import { css } from "@emotion/react";
import Head from "next/head";
import React from "react";
import EmptyCoursesPlaceholder from "../components/EmptyCoursesPlaceholder";
import FlexContainer from "../components/FlexContainer";
import designSystem from "../styles/designSystem";
import { generateIndividualTags } from "../services/frontend/meta.service";
import { useLiveQuery } from "dexie-react-hooks";
import CourseRepository from "src/services/frontend/courseRepository.service";
import Course from "src/components/Course";

/**
 * An MyCoursePage React Component.
 * @author
 * @version 0.1
 */
const MyCoursePage: React.FC = () => {
  const courses = useLiveQuery(() =>
    CourseRepository.getAll(),
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

      {courses ? (
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
          <EmptyCoursesPlaceholder />
        </FlexContainer>
      )}
    </>
  );
};

export default MyCoursePage;
