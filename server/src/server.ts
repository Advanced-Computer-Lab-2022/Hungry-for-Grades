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
import UserRoute from './User/user.route';
import ReportRoute from './Report/report.route';
import { Server } from 'socket.io';
import MessageRoute from './Message/message.route';
import * as http from 'http';

// validate environment variables
validateEnv();

try {
  const app = new App([
    new AuthRoute(),
    new AdminRoute(),
    new CoursesRoute(),
    new InstructorsRoute(),
    new TraineeRoute(),
    new NewsLetterRoute(),
    new UserRoute(),
    new ReportRoute(),
    new MessageRoute(),
  ]);

  (async function connectToDatabase() {
    connect(dbConnection.url, dbConnection.options)
      .then(() => {
        const server = http.createServer(app.app);

        const io = new Server(server, {
          cors: {
            credentials: true,
            origin: ['http://localhost:8000', 'http://127.0.0.1:8000'],
          },
        });
        global.onlineUsers = new Map();
        io.on('connection', socket => {
          global.chatSocket = socket;
          socket.on('add-user', userId => {
            global.onlineUsers.set(userId, socket.id);
          });

          socket.on('send-msg', data => {
            const sendUserSocket = global.onlineUsers.get(data.to);
            if (sendUserSocket) {
              socket.to(sendUserSocket).emit('msg-recieve', data.msg);
            }
          });
        });
        server.listen(app.port, () => {
          logger.info(`=================================`);
          logger.info(`======= ENV: ${app.env} =======`);
          logger.info(`🚀 App listening on the http://localhost:${app.port}`);
          logger.info(`📃 API on the http://localhost:${app.port}/docs`);
          logger.info(`=================================`);
        });
      })
      .catch(err => logger.error(`Connection to database failed with error: ${err}`));

    connection.on('connecting', () => logger.info('database connecting'));
    connection.on('connected', () => logger.info('database connected'));
    connection.on('disconnecting', () => logger.info('database disconnecting'));
    connection.on('disconnected', () => logger.info('database disconnected'));
    connection.on('error', () => logger.info('database error'));
  })();
} catch (err) {
  console.log(err);
}
