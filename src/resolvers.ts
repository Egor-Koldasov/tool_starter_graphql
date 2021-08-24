import requireAll from "require-all";

export const getModules = (path: string) => {
  const queries = requireAll({
    dirname: __dirname + path,
    filter: /(.+)\.ts/,
    resolve: (module) => (_: any, args: any) => module.default(args, _),
  });
  return queries;
}

export const getResolvers = () => ({
  Query: getModules('/queries'),
  Mutation: getModules('/mutations'),
})
