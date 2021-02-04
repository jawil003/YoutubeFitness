import { gql } from "apollo-server-micro";

const Mutation = gql`
  type Mutation {
    send(
      contactRequest: ContactRequestInput!
    ): ContactRequest!
  }
`;
export default Mutation;
