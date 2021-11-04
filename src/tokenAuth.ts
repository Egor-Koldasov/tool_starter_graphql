import { NextFunction, Request, Response } from "express";
import config from "./config";
import { db } from "./database/db-connection";
import { AppRequest } from "./types/AppRequest";
import User from "./database/User";
import { v4 as uuidv4 } from 'uuid';


const getUserFromToken = async (token: string) => {
  const auth = (await db('auth').where({token}))[0];
  const user: User | null = !auth ? null : (await db('app_user').where({id: auth.user_id}))[0];
  return user;
}
export const authMiddleware = () => async (req: Request, res: Response, next: NextFunction) => {
  const authCookie = req.signedCookies[config.authCookieName];
  const appReq = req as AppRequest;
  appReq.getUser = async () => authCookie ? await getUserFromToken(authCookie) : null;
  next();
}
export const addAuthToken = async (user: User, res: Response) => {
  const token = uuidv4();
  await db('auth').insert({token, user_id: user.id});
  res.cookie(config.authCookieName, token, {sameSite: 'none', secure: true, signed: true});
}
