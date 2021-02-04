import { IResolvers } from "apollo-server-micro";
import YoutubeService from "src/services/backend/youtube.service";
import { YoutubeVideoType } from "./youtubeVideo.type";

const youtubeService = new YoutubeService();

const YoutubeResolver: IResolvers = {
  Query: {
    youtubeVideoMetadata: async (
      _parent,
      {
        youtubeVideoId,
      }: { youtubeVideoId: string },
      _context,
      _info,
    ): Promise<YoutubeVideoType> => {
      const {
        items,
      } = await youtubeService.getMetadataForVideo(
        youtubeVideoId,
      );
      const {
        id,
        snippet: { title, thumbnails },
      } = items[0];
      return { id, title, thumbnails };
    },
  },
};
export default YoutubeResolver;
