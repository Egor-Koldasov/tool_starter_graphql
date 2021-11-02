import { gql } from 'apollo-server';


const typeDefs = gql`
  type User {
    id: Int!
    email: String!
  }

  type Query {
    me: User
    user(id: Int!): User
  }

  type AuthResponse {
    success: Boolean!
    message: String
    me: User
  }

  type Mutation {
    login(email: String, password: String): AuthResponse
    signup(email: String, password: String): AuthResponse
  }
`;

export default typeDefs;