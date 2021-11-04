import { gql } from '@apollo/client/core';
import { query } from 'express';
import { db } from '../../../database/db-connection';
import { startServer } from "../../../server"
import { testApolloClient } from '../../util/testApolloClient';

const testUsers = [
  {
    "email": "egor@test.com",
    "password": "123lol"
  }
]
const clearTestUsers = async () => {
  await db('app_user').modify((query) => testUsers.map(({email}) => query.orWhere({email}))).del()
}
describe('Auth basics', () => {
  beforeAll(async () => {
    await startServer();
    await clearTestUsers();
  })
  afterAll(async () => {
    await clearTestUsers();
  })
  test('sign up', async () => {
    await testApolloClient(async (client) => {
      const result = await client
        .mutate(
          {
            mutation: gql`
              mutation Mutation($email: String, $password: String) {
                signup(email: $email, password: $password) {
                  success
                  message
                  me {
                    id
                    email
                  }
                }
              }
            `,
            variables: testUsers[0]
          }
        )
      expect(result).toHaveProperty('data.signup.success', true)
      expect(result).toHaveProperty('data.signup.me.email', testUsers[0].email)
    })
  })

  test('me', async () => {
    await testApolloClient(async (client) => {

      const result = await client
        .query({
          query: gql`
            query Query {
              me {
                email
              }
            }
          `
        })
      expect(result).toHaveProperty('data.me.email', testUsers[0].email)
    });
  })
})