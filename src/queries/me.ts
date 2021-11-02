import { AppContext } from "../types/AppContext";

export default async (args: void, context: AppContext, _: any, __: any) => {
  const user = await context.req.getUser();
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
  };
}
