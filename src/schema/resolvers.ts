import requireAll from "require-all";
import path from 'path';

export const getModules = (relPath: string) => {
  const queries = requireAll({
    dirname: path.resolve(__dirname, relPath),
    filter: /(.+)\.ts/,
    resolve: (module) => async (parent: any, args: any, context: any, info: any) => {
      const resolver = module.default;
      try {
        return await resolver(args, context, info, parent);
      } catch (error) {
        console.error(error);
        throw new Error("Server error");
      }
    }
  });
  return queries;
}

export const getResolvers = () => ({
  Query: getModules('../queries'),
  Mutation: getModules('../mutations'),
})
