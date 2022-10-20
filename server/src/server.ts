import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import mongoose from 'mongoose';
import { dbConnection } from '@databases';
import { logger } from '@utils/logger';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute()]);

(async function connectToDatabase() {
   
       mongoose.connect(dbConnection.url)
       .then(result => app.listen())
       .catch(err => logger.error(`Connection to database failed`));
  
 
})();
