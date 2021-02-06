import { gql } from "@apollo/client";
import { localClient } from "src/config/client";

export default class YoutubeService {
  public async getMetadataForVideo(
    youtubeVideoUrl: string,
  ) {
    /*const youtubeVideoId = youtubeVideoUrl.split(
      "v=",
    )[1];*/
    const {
      data: {
        thumbnails: {
          default: {
            url: thumbnailUrl,
          },
        },
        title,
      },
    } = await localClient.query<YoutubeMetaData>(
      {
        query: gql`
          {
            videoData: youtubeVideoMetadata(
              youtubeVideoId: "${youtubeVideoUrl}"
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
      },
    );
    return {
      title,
      youtubeVideoId,
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
