import axios from "axios";

export default class YoutubeService {
  public async getMetadataForVideo(youtubeVideoId: string) {
    const { YOUTUBE_API_KEY } = process.env;
    const { data, status } = await axios.get<YoutubeSnippetResponse>(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${youtubeVideoId}&key=${YOUTUBE_API_KEY}`
    );
    if (!data || status >= 300) {
      throw new Error(
        "Could not find a matching Video for the provided YoutubeVideoId"
      );
    }

    return data;
  }
}

interface YoutubeSnippetResponse {
  kind: string;
  etag: string;
  items: [
    {
      kind: string;
      etag: string;
      id: string;
      snippet: {
        publishedAt: string;
        channelId: string;
        title: string;
        description: string;
        thumbnails: {
          default: {
            url: string;
            width: number;
            height: number;
          };
          medium: {
            url: string;
            width: number;
            height: number;
          };
          high: {
            url: string;
            width: number;
            height: number;
          };
          standard: {
            url: string;
            width: number;
            height: number;
          };
        };
        channelTitle: string;
        tags: string[];
        categoryId: string;
        liveBroadcastContent: string;
        localized: {
          title: string;
          description: string;
        };
        defaultAudioLanguage: string;
      };
    }
  ];
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}
