import requireAll from "require-all";

export const getQueries = () => {
  const queries = requireAll({
    dirname: __dirname + '/queries',
    filter: /(.+)\.ts/,
    resolve: (module) => module.default,
  });
  return queries;
}

export const getResolvers = () => ({
  Query: {
    ...getQueries(),
  }
})
