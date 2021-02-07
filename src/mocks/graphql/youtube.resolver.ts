import YoutubeService from "../../services/backend/youtube.service";
import {
  Arg,
  Query,
  Resolver,
} from "type-graphql";
import YoutubeVideo from "../../graphql/youtubeVideo.type";

@Resolver()
export default class YoutubeResolver {
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
    return {
      id: youtubeVideoId,
      title:
        "Burn 600 Calories in a 60-Minute Workout With Jeanette Jenkins",
      thumbnails: {
        default: {
          url:
            "https://i.ytimg.com/vi/s3F6R92s6_o/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url:
            "https://i.ytimg.com/vi/s3F6R92s6_o/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url:
            "https://i.ytimg.com/vi/s3F6R92s6_o/hqdefault.jpg",
          width: 480,
          height: 360,
        },
        standard: {
          url:
            "https://i.ytimg.com/vi/s3F6R92s6_o/sddefault.jpg",
          width: 640,
          height: 480,
        },
      },
    };
  }
}
