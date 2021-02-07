import YoutubeService from "../services/backend/youtube.service";
import {
  Arg,
  Query,
  Resolver,
} from "type-graphql";
import YoutubeVideo from "./youtubeVideo.type";

@Resolver()
export default class YoutubeResolver {
  private youtubeService = new YoutubeService();
  @Query(() => YoutubeVideo, {
    nullable: false,
    description:
      "Returns Metadata for an YoutubeVideoUrl",
  })
  async youtubeVideoMetadata(
    @Arg("youtubeVideoId", {
      nullable: false,
    })
    youtubeVideoId: string,
  ): Promise<YoutubeVideo> {
    const {
      items,
    } = await this.youtubeService.getMetadataForVideo(
      youtubeVideoId,
    );
    const {
      snippet: { title, thumbnails },
    } = items[0];

    return {
      id: youtubeVideoId,
      title,
      thumbnails,
    };
  }
}
