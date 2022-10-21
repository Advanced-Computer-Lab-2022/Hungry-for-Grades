import { DB_USERNAME, DB_PASSWORD, DB_DATABASE } from '@config';

export const dbConnection = {
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  url: `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@websitecluster.pg06qgw.mongodb.net/${DB_DATABASE}?retryWrites=true&w=majority`,
};
