import { gql } from 'apollo-server';
import {readFile} from 'fs';
import {promisify} from 'util';
import {resolve} from 'path';

export const getSchema = async () => {
  const schemaStr = await promisify(readFile)(resolve(__dirname, 'schema.gql'), {encoding: 'utf-8'});
  return gql(schemaStr);
}