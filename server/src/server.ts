import App from '@/app';
import { dbConnection } from '@databases';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import { logger } from '@utils/logger';
import validateEnv from '@utils/validateEnv';
import mongoose from 'mongoose';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute()]);

(async function connectToDatabase() {

       mongoose.connect(dbConnection.url)
       .then(result => app.listen())
       .catch(err => logger.error(`Connection to database failed`));
       mongoose.connection.on('connecting', () => logger.info('database connecting'))
       mongoose.connection.on('connected', () => logger.info('database connected'))
       mongoose.connection.on('disconnecting', () => logger.info('database disconnecting'))
       mongoose.connection.on('disconnected', () => logger.info('database disconnected'))
       mongoose.connection.on('error', () => logger.error('database error'))

})();
