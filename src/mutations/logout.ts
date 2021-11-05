import { removeAuthToken } from "../tokenAuth";
import { AppContext } from "../types/AppContext";

const logout = async (_: unknown, context: AppContext) => {
  await removeAuthToken(context.res);
  return {success: true}
}

export default logout;