import bcrypt from 'bcrypt'
import util from 'util';
import { AppContext } from "../types/AppContext";
import { addAuthToken } from '../tokenAuth';
import { db } from "../database/db-connection"
import User from "../database/User";

interface Args {
  email: string,
  password: string,
}
const signup = async (args: Args, context: AppContext) => {
  const existingUser: User = (await db('app_user').where({email: args.email}))[0];
  if (existingUser) {
    return {
      success: false,
      message: 'This email is already in use',
    };
  }
  const passwordHash = await util.promisify(bcrypt.hash)(args.password, 10);
  await db('app_user').insert({email: args.email, password: passwordHash});
  const registeredUser: User = (await db('app_user').where({email: args.email}))[0];
  await addAuthToken(registeredUser, context.res);
  return {
    success: true,
    me: registeredUser,
  }
}
export default signup