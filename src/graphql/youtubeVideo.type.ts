import {
  Field,
  ObjectType,
} from "type-graphql";

@ObjectType()
class YoutubeThumbnailsElement {
  @Field()
  url!: string;
  @Field()
  width!: number;
  @Field()
  height!: number;
}

@ObjectType()
class YoutubeThumbnails {
  @Field()
  default!: YoutubeThumbnailsElement;
  @Field()
  medium!: YoutubeThumbnailsElement;
  @Field()
  high!: YoutubeThumbnailsElement;
  @Field()
  standard!: YoutubeThumbnailsElement;
}

@ObjectType()
export default class YoutubeVideo {
  @Field()
  id!: string;
  @Field()
  title!: string;
  @Field(() => YoutubeThumbnails)
  thumbnails!: YoutubeThumbnails;
}
