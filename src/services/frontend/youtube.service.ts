import logger from "logger";
import { localApiClient } from "src/config/client";

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
        },
      },
    } = data;

    return {
      title,
      id: youtubeVideoId,
      thumbnailUrl,
      url: youtubeVideoUrl,
    };
  }
}

interface YoutubeMetaData {
  id: string;
  title: string;
  thumbnails: {
    default: {
      url: string;
    };
  };
}
