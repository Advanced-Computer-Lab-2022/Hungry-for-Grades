import { DB_DATABASE, DB_PASSWORD, DB_USERNAME } from '@config';
import { ConnectOptions } from 'mongoose';

const options: ConnectOptions = {
  autoCreate: true,
  autoIndex: true,
  pass: DB_PASSWORD,
  user: DB_USERNAME,
};
export const dbConnection = {
  options,
  url: `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@websitecluster.pg06qgw.mongodb.net/${DB_DATABASE}?retryWrites=true&w=majority`,
};
