import logger from "../../config/logger";
import { localApiClient } from "../../config/client";
import TimeConverterService from "./timeConverter.service";

export default class YoutubeService {
  public async getMetadataForVideo(
    youtubeVideoUrl: string,
  ) {
    const youtubeVideoId = youtubeVideoUrl.split(
      "v=",
    )[1];
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
