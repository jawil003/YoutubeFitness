import { gql } from "apollo-server-micro";

const YouTubeVideo = gql`
  type YouTubeVideo {
    id: String!;
    title: String!
  }
`;
export default YouTubeVideo;
