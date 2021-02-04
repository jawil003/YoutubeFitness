import axios from "axios";

export default class NoEmbedService {
  public getMetaDataByYoutubeUrl = async (
    youtubeUrl: string,
  ) => {
    return await axios.get<Response>(
      `https://noembed.com/embed?url=${youtubeUrl}`,
    );
  };
}

interface Response {
  type: string;
  author_url: string;
  thumbnail_width: number;
  thumbnail_url: string;
  author_name: string;
  html: string;
  title: string;
  thumbnail_height: number;
  provider_name: string;
  url: string;
  height: number;
  version: number;
  width: string;
  provider_url: string;
}
