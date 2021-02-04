import { ApolloServer } from "apollo-server-micro";
import Mutation from "src/graphql/mutation.type";
import Query from "src/graphql/query.type";
import YoutubeVideo from "src/graphql/youtubeVideo.type";
import YoutubeVideoThumbnail from "src/graphql/youtubeVideoThumbnail.type";
import YoutubeVideoThumbnailElement from "src/graphql/youtubeVideoThumbnailElement.type";
import YoutubeResolver from "src/graphql/youtube.resolver";

const apolloServer = new ApolloServer({
  typeDefs: [
    Mutation,
    Query,
    YoutubeVideo,
    YoutubeVideoThumbnail,
    YoutubeVideoThumbnailElement,
  ],
  resolvers: [YoutubeResolver],
});

export default apolloServer.createHandler(
  {
    path: "/api/graphql",
  },
);

export const config = {
  api: {
    bodyParser: false,
  },
};
