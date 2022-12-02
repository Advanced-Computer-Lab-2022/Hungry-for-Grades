import App from '@/app';
import AuthRoute from '@/Authentication/auth.route';
import { dbConnection } from '@/Databases';

import { logger } from '@/Utils/logger';
import validateEnv from '@/Utils/validateEnv';
import { connect, connection } from 'mongoose';
import AdminRoute from './Admin/admin.route';
import CoursesRoute from './Course/course.route';
import InstructorsRoute from '@Instructor/instructor.route';
import TraineeRoute from './Trainee/trainee.route';
import NewsLetterRoute from './NewsLetter/newsletter.route';

validateEnv();

try {
  const app = new App([new AuthRoute(), new AdminRoute(), new CoursesRoute(), new InstructorsRoute(), new TraineeRoute(), new NewsLetterRoute()]);

  (async function connectToDatabase() {
    connect(dbConnection.url, dbConnection.options)
      .then(() => app.listen())
      .catch(err => logger.error(`Connection to database failed with error: ${err}`));

    connection.on('connecting', () => logger.info('database connecting'));
    connection.on('connected', () => logger.info('database connected'));
    connection.on('disconnecting', () => logger.info('database disconnecting'));
    connection.on('disconnected', () => logger.info('database disconnected'));
    connection.on('error', () => logger.info('database error'));
  })();
} catch (err) {
  logger.info(err);
}
