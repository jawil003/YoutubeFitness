import { css } from "@emotion/react";
import React from "react";
import useIntentContext from "src/hooks/useIntent.hook";
import CourseRepository from "src/services/frontend/courseRepository.service";
import designSystem from "../styles/designSystem";
import ThreeDotMenu from "./ThreeDotMenu";
import { useQueryClient } from "react-query";
import { Query } from "../config/reactQuery.enum";
import Video from "src/entities/video.entity";
import useFabContext from "src/hooks/useFabContext";

interface Props {
  id?: number;
  title: string;
  videos: (Video & {
    begin: number;
    end: number;
  })[];
}

/**
 * An Course React Component.
 * @author Jannik Will
 * @version 0.1
 */
const Course: React.FC<Props> = ({
  title,
  id,
  videos,
}) => {
  const {
    toggleYoutube,
  } = useIntentContext();
  const {
    toggle,
    setData,
  } = useFabContext();
  const queryClient = useQueryClient();
  return (
    <div
      css={css`
        & {
          width: 100%;
          max-width: 371px;
        }

        & {
          filter: drop-shadow(
            2px 4px 16px
              rgba(0, 0, 0, 0.25)
          );
          background-color: ${designSystem
            .colors.brand.primary};
          border-radius: 18px;

          height: 140px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          position: relative;
        }
        & > .imageContainer {
          height: 100%;
          width: 155px;
          overflow: hidden;
          position: relative;
        }
        & > div > img {
          height: 100%;
          filter: blur(2px);
        }
        & > div > img ~ div {
          position: absolute;
          top: 0;
          left: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
        & > div > img ~ div > div {
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 18px 0 18px 36px;
          border-color: transparent
            transparent transparent
            #f3f3f3;
        }

        & > span {
          flex: 1;
          padding: 20px 40px;
          text-align: center;
        }
        & > .menuContainer {
          position: absolute;
          right: 0;
          top: 0;
          height: 100%;
          width: 40px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
      `}
    >
      <div
        className="imageContainer"
        onClick={() => {
          //TODO: Fix the IntentContext and the YoutubeWIndow to use Playlist
          toggleYoutube({
            title,
            videos,
          });
        }}
      >
        <img
          src={videos[0].thumbnailUrl}
          alt={title + "-image"}
        />
        <div>
          <div />
        </div>
      </div>
      <span>{title}</span>
      <div className="menuContainer">
        <ThreeDotMenu
          items={[
            {
              name: "Edit",
              onClick: async () => {
                setData({
                  title,
                  videos,
                });
                toggle();
              },
            },
            {
              name: "Delete",
              onClick: async () => {
                if (id) {
                  await CourseRepository.deleteById(
                    id,
                  );
                  await queryClient.invalidateQueries(
                    Query.courses,
                  );
                }
              },
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Course;
