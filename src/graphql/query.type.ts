import { gql } from "apollo-server-micro";

const Query = gql`
  type Query {
    youtubeVideoMetadata(
      youtubeVideoId: String!
    ): YouTubeVideo!
  }
`;
export default Query;
