import { gql } from "apollo-server-micro";

const Query = gql`
  type Query {
    dummy: Boolean
  }
`;
export default Query;
