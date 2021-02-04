import { gql } from "apollo-server-micro";
import { YouTubeVideoThumbnailElement } from "./youtubeVideoThumbnailElement.type";

const YouTubeVideoThumbnail = gql`
  type YouTubeVideoThumbnail {
    default: YouTubeVideoThumbnailElement!
    medium: YouTubeVideoThumbnailElement!
    high: YouTubeVideoThumbnailElement!
    standard: YouTubeVideoThumbnailElement!
  }
`;
export default YouTubeVideoThumbnail;

export interface YoutubeVideoThumbnail {
  default: YouTubeVideoThumbnailElement;
  medium: YouTubeVideoThumbnailElement;
  high: YouTubeVideoThumbnailElement;
  standard: YouTubeVideoThumbnailElement;
}
