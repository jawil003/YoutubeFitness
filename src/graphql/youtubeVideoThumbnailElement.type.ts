import { gql } from "apollo-server-micro";

const YouTubeVideoThumbnailElement = gql`
  type YouTubeVideoThumbnailElement {
    url: String!
    width: Int!
    height: Int!
  }
`;
export default YouTubeVideoThumbnailElement;

export interface YouTubeVideoThumbnailElement {
  url: string;
  width: number;
  height: number;
}
