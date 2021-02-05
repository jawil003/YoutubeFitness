// Template from: https://stackoverflow.com/questions/62105419/next-js-api-routes-with-type-graphql-error-resolver-is-not-a-function

import "reflect-metadata";
import { ApolloServer } from "apollo-server-micro";
import { buildSchema } from "type-graphql";
import {
  NextApiRequest,
  NextApiResponse,
} from "next";
import YoutubeResolver from "src/graphql/youtube.resolver";

let apolloServerHandler: (
  req: any,
  res: any,
) => Promise<void>;

const getApolloServerHandler = async () => {
  if (!apolloServerHandler) {
    const schema = await buildSchema({
      resolvers: [YoutubeResolver],
    });
    apolloServerHandler = new ApolloServer(
      { schema },
    ).createHandler({
      path: "/api/graphql",
    });
  }
  return apolloServerHandler;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const apolloServerHandler = await getApolloServerHandler();
  return apolloServerHandler(req, res);
};

export const config = {
  api: { bodyParser: false },
};
