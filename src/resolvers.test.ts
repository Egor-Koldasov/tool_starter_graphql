import { getQueries, getResolvers } from "./resolvers";

test('queies exist', () => {
  const queries = getQueries();
  expect(queries).toBeDefined();
  expect(queries).toHaveProperty('me');
})

test('Resolvers', () => {
  const resolvers = getResolvers()
  expect(resolvers).toHaveProperty('Query')
  expect(resolvers.Query).toHaveProperty('me')
  expect(resolvers.Query).toHaveProperty('getUser')
})
