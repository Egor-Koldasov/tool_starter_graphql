import knex from 'knex';
import { lensProp, set } from 'ramda';
import config from '../config';

export let db = knex({
  client: 'pg',
  connection: set(lensProp('database'), 'postgres', config.db),
});
export const initDatabase = async () => {
  const res = await db.raw(`SELECT datname FROM pg_catalog.pg_database WHERE datname='${config.db.database}'`);
  if (res.rows.length === 0) {
    await db.raw(`CREATE DATABASE "${config.db.database}"`);
  }
  await db.destroy();
  db = knex({
    client: 'pg',
    connection: config.db,
  });
  return db;
}