import bcrypt from 'bcrypt'
import { AppContext } from "../types/AppContext";
import { db } from "../database/db-connection"
import User from "../database/User";
import { addAuthToken } from '../tokenAuth';

interface Args {
  email: string,
  password: string,
}
const login = async (args: Args, context: AppContext) => {
  const user: User = (await db('app_user').where({email: args.email}))[0];
  if (!user) {
    return {
      success: false,
      message: 'Email not found',
    };
  }
  const isPasswordCorrect = await bcrypt.compare(args.password, user.password)
  if (!isPasswordCorrect) {
    return {
      success: false,
      message: 'Email or password is incorrect',
    }
  }
  await addAuthToken(user, context.res);
  return {
    success: true,
    me: user,
  }
}
export default login