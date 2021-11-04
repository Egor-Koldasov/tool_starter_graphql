import knex from 'knex';
import { lensProp, set } from 'ramda';
import config from '../config';

export const db = knex({
  client: 'pg',
  connection: config.db,
});
