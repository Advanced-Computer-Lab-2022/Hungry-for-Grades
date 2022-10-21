import {
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
} from '@config';

export const dbConnection = {
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
};
