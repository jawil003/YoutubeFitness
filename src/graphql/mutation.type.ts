import { gql } from "apollo-server-micro";

const Mutation = gql`
  type Mutation {
    dummy: Boolean!
  }
`;
export default Mutation;
