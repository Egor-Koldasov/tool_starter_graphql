import knex from 'knex';

export const db = knex({
  client: 'pg',
  connection: {
    host : 'postgres',
    user : 'admin',
    password : 'devpassword',
    database : 'dev_overview'
  }
});
