import App from '@/app';
import { dbConnection } from '@databases';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import { logger } from '@utils/logger';
import validateEnv from '@utils/validateEnv';
import { connect, connection } from 'mongoose';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute()]);

(async function connectToDatabase() {
  connect(dbConnection.url)
    .then(() => app.listen())
    .catch(err => logger.error(`Connection to database failed with error: ${err}`));
  connection.on('connecting', () => logger.info('database connecting'));
  connection.on('connected', () => logger.info('database connected'));
  connection.on('disconnecting', () => logger.info('database disconnecting'));
  connection.on('disconnected', () => logger.info('database disconnected'));
  connection.on('error', () => logger.error('database error'));
})();