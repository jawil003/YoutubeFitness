import { gql } from "apollo-server-micro";
import { YoutubeVideoThumbnail } from "./youtubeVideoThumbnail.type";

const YouTubeVideo = gql`
  type YouTubeVideo {
    id: String!
    title: String!
    thumbnails: YouTubeVideoThumbnail!
  }
`;
export default YouTubeVideo;

export interface YoutubeVideoType {
  id: string;
  title: string;
  thumbnails: YoutubeVideoThumbnail;
}
