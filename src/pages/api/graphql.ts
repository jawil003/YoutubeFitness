import "reflect-metadata";
import { ApolloServer } from "apollo-server-micro";
import { buildSchema } from "type-graphql";
import {
  NextApiRequest,
  NextApiResponse,
} from "next";

let apolloServerHandler: (
  req: any,
  res: any,
) => Promise<void>;

const getApolloServerHandler = async () => {
  if (!apolloServerHandler) {
    const schema = await buildSchema({
      resolvers: [
        "src/graphql/**.resolver.ts",
      ],
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
