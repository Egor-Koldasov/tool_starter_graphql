import { db } from "../database/db-connection"

interface IArgs {id: number}
const getUser = async (_: never, args: IArgs) => {
  return (await db('app_user').where({id: args.id}))[0]
}
export default getUser
