import {
  Field,
  ObjectType,
} from "type-graphql";

@ObjectType()
class YoutubeThumbnailsElement {
  @Field({
    description:
      "The Url from which the Image can be fetched",
    nullable: false,
  })
  url!: string;
  @Field({
    description:
      "The Height of the Image",
    nullable: false,
  })
  width!: number;
  @Field({
    description:
      "The Width of the Image",
    nullable: false,
  })
  height!: number;
}

@ObjectType()
class YoutubeThumbnails {
  @Field({
    description:
      "The Thumbnail in the Default Resolution",
    nullable: false,
  })
  default!: YoutubeThumbnailsElement;
  @Field({
    description:
      "The Thumbnail in Medium Resolution",
    nullable: false,
  })
  medium!: YoutubeThumbnailsElement;
  @Field({
    description:
      "The Thumbnail in High Resolution",
    nullable: false,
  })
  high!: YoutubeThumbnailsElement;
  @Field({
    description:
      "The Thumbnail in the Standard Resolution",
    nullable: false,
  })
  standard!: YoutubeThumbnailsElement;
}

@ObjectType()
export default class YoutubeVideo {
  @Field({
    description:
      "The Video Id of the Youtube Video",
    nullable: false,
  })
  id!: string;
  @Field({
    description:
      "The Title of the Youtube Video in the Original Language",
    nullable: false,
  })
  title!: string;
  @Field(() => YoutubeThumbnails, {
    description:
      "The Thumbnails for the Video in different Sizes",
    nullable: false,
  })
  thumbnails!: YoutubeThumbnails;
  @Field({
    description:
      "The Duration of the Video in ISO 8601",
    nullable: false,
  })
  duration!: string;
}
