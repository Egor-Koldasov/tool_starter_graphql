import { importEnv } from "../database/env/setup-env";


export default async () => {
  importEnv(__dirname, '../../test.env');
  importEnv(__dirname, '../../dev.env');
}