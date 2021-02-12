import logger from "../../config/logger";
import { localApiClient } from "../../config/client";
import TimeConverterService from "./timeConverter.service";
import VideoRepository from "./videoRepository.service";

export default class YoutubeService {
  public async getMetadataForVideo(
    youtubeVideoUrl: string,
  ) {
    // Get Id from VideoUrl
    const youtubeVideoId = youtubeVideoUrl.split(
      "v=",
    )[1];

    // If Video already exists in Video Table return that instead of new fetched one.
    const existingVideo = await VideoRepository.findByYoutubeVideoId(
      youtubeVideoId,
    );

    if (existingVideo) {
      return {
        title: existingVideo?.title,
        youtubeVideoId,
        thumbnailUrl:
          existingVideo?.thumbnailUrl,
        url: youtubeVideoUrl,
        duration: existingVideo?.length,
      };
    }

    //Load Video Metadata from Youtube Data API v3
    const {
      data,
    } = await localApiClient.post<{
      data: {
        videoData: YoutubeMetaData;
      };
    }>("/graphql", {
      query: `
          {
            videoData: youtubeVideoMetadata(
              youtubeVideoId: "${youtubeVideoId}"
            ) {
              id
              title
              thumbnails {
                default {
                  url
                }
              }
              duration
          }
        }
        `,
    });
    logger.debug(
      `Frontend fetched ${data}`,
    );

    const {
      data: {
        videoData: {
          thumbnails: {
            default: {
              url: thumbnailUrl,
            },
          },
          title,
          duration,
        },
      },
    } = data;

    // Return required Data in different format
    return {
      title,
      youtubeVideoId,
      thumbnailUrl,
      url: youtubeVideoUrl,
      duration: TimeConverterService.getSecondsFromISO8601(
        duration,
      ),
    };
  }
  public static getIdFromUrl(
    url: string,
  ) {
    return url.split("v=")[1];
  }
}

interface YoutubeMetaData {
  id: number;
  title: string;
  thumbnails: {
    default: {
      url: string;
    };
  };
  duration: string;
}
