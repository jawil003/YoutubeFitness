import "reflect-metadata";
import { createServer } from "miragejs";
import { createGraphQLHandler } from "@miragejs/graphql";
import { buildTypeDefsAndResolvers } from "type-graphql";
import YoutubeResolver from "./youtube.resolver";

const startServer = async () => {
  const {
    typeDefs,
    resolvers,
  } = await buildTypeDefsAndResolvers({
    resolvers: [YoutubeResolver],
  });

  createServer({
    routes() {
      this.post(
        "/api/graphql",
        createGraphQLHandler(
          typeDefs,
          this.schema,
        ),
      );
    },
    seeds(server): {
      server.create("Movie", {})
    }
  });
};

export default startServer;
