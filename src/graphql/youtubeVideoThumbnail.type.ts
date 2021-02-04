import { gql } from "apollo-server-micro";

const YouTubeVideoThumbnail = gql`
  type YouTubeVideoThumbnail {
    default: YouTubeVideoThumbnailElement!;
    medium: YouTubeVideoThumbnailElement!
    high: YouTubeVideoThumbnailElement!
    standard: YouTubeVideoThumbnailElement!
  }
`;
export default YouTubeVideoThumbnail;
