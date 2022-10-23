import App from '@/app';
import AuthRoute from '@/Authentication/auth.route';
import { dbConnection } from '@/databases';
import UsersRoute from '@/User/user.route';
import { logger } from '@utils/logger';
import validateEnv from '@utils/validateEnv';
import { connect, connection } from 'mongoose';

validateEnv();

const app = new App([new UsersRoute(), new AuthRoute()]);

(async function connectToDatabase() {
  connect(dbConnection.url, dbConnection.options)
    .then(() => app.listen())
    .catch(err => logger.error(`Connection to database failed with error: ${err}`));

  connection.on('connecting', () => logger.info('database connecting'));
  connection.on('connected', () => logger.info('database connected'));
  connection.on('disconnecting', () => logger.info('database disconnecting'));
  connection.on('disconnected', () => logger.info('database disconnected'));
  connection.on('error', () => logger.error('database error'));
})();
