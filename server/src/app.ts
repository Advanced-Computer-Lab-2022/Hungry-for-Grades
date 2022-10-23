import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { version } from '../package.json';
import swaggerFile from '../swagger.json';

import { CREDENTIALS, LOG_FORMAT, NODE_ENV, ORIGIN, PORT } from '@config';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { Routes } from '@/common/Interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import modelsErrorMiddleware from './middlewares/modelsError.middleware';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the http://localhost:${this.port}`);
      logger.info(`📃 API on the http://localhost:${this.port}/docs`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(
      cors({
        credentials: CREDENTIALS,
        origin: ORIGIN,
      }),
    );
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use(route.path, route.router);
    });
  }

  private initializeSwagger() {
    const options: swaggerJSDoc.Options = {
      apis: ['src/routes/*.route.ts', 'src/dtos/*.dto.ts'],
      definition: {
        apis: ['swagger.json'],
        components: {
          securitySchemes: {
            bearerAuth: {
              bearerFormat: 'JWT',
              scheme: 'bearer',
              type: 'http',
            },
          },
        },
        info: {
          contact: { email: 'osa.helpme@gmail.com' },
          description: '',
          license: {
            name: 'Apache 2.0',
            url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
          },
          termsOfService: 'http://swagger.io/terms/',
          title: 'Swagger Cousrses API',
          version: version,
        },
        openapi: '3.0.0',
        security: [
          {
            bearerAuth: [],
          },
        ],
        servers: [{ url: 'http://localhost:3000' }],
      },
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs), swaggerUi.setup(swaggerFile));

    this.app.get('/swagger.json', (req: Request, res: Response) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(specs);
    });
  }

  private initializeErrorHandling() {
    this.app.use(modelsErrorMiddleware);
    this.app.use(errorMiddleware);
  }
}

export default App;
