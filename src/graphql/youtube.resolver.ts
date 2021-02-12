import YoutubeService from "../services/backend/youtube.service";
import {
  Arg,
  Query,
  Resolver,
  Info,
} from "type-graphql";
import YoutubeVideo from "./youtubeVideo.type";
import InfoType from "./InfoType.type";

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
    @Info() _info: InfoType,
  ): Promise<YoutubeVideo> {
    //TODO: Find out which Data really needs to be fetched
    const {
      items,
    } = await this.youtubeService.getMetadataForVideo(
      youtubeVideoId,
      ["contentDetails", "snippet"],
    );
    const {
      snippet: { title, thumbnails },
      contentDetails: { duration },
    } = items[0];

    return {
      id: youtubeVideoId,
      title,
      thumbnails,
      duration,
    };
  }
}
