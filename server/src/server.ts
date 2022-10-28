import App from '@/app';
import AuthRoute from '@/Authentication/auth.route';
import { dbConnection } from '@/Databases';
import UsersRoute from '@/User/user.route';
import { logger } from '@/Utils/logger';
import validateEnv from '@/Utils/validateEnv';
import { connect, connection } from 'mongoose';
import AdminRoute from './Admin/admin.route';
import CoursesRoute from './Course/course.route';

validateEnv();

const app = new App([new UsersRoute(), new AuthRoute(), new CoursesRoute(), new AdminRoute()]);

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
