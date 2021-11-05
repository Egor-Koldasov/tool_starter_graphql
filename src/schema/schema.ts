import { gql } from 'apollo-server';


const typeDefs = gql`
  type User {
    id: Int!
    email: String!
  }

  type AuthResponse {
    success: Boolean!
    message: String
    me: User
  }

  type Response {
    success: Boolean!
    message: String
  }

  type Query {
    me: User
    user(id: Int!): User
  }

  type Mutation {
    login(email: String, password: String): AuthResponse
    signup(email: String, password: String): AuthResponse
    logout: Response
  }
`;

export default typeDefs;