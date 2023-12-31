import 'dotenv/config'; // Import and configure dotenv
import express, { Application, NextFunction, Request, Response } from 'express';
import { errorHandler } from './middlewares/error-handler';
import helmet from 'helmet';
import { router } from './routes/contract.route';

class App {
  public express: Application = express();

  constructor() {
    this.config();
    this.setAccessControl();
    this.mountRoutes();
  }

  private setAccessControl() {
    this.express.use((req: Request, res: Response, next: NextFunction) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      );
      res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With,Accept,Content-Type,Authorization',
      );
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      next();
    });
  }

  private mountRoutes(): void {
    this.express.get('/', (req, res) => {
      res.sendStatus(200);
    });

    // Convert null or false values to valid types as before
    this.express.use((req: Request, res: Response, next: NextFunction) => {
      const convertNullOrFalse = (data: any) => {
        for (const key in data) {
          if (typeof data[key] === 'object') {
            convertNullOrFalse(data[key]);
            continue;
          }
          if (typeof data[key] !== 'string') {
            continue;
          }
          const value = data[key].toLowerCase();
          if (value === 'null') {
            data[key] = null;
          } else if (value === 'undefined') {
            data[key] = undefined;
          } else if (value === 'false') {
            data[key] = false;
          } else if (value === 'true') {
            data[key] = true;
          }
        }
      };
      try {
        convertNullOrFalse(req.body);
        convertNullOrFalse(req.query);
      } catch (err) {
        console.error(err.message);
      }
      next();
    });

    // health check
    this.express.use('/health', (_req, res) => {
      res.send({ message: 'Application running successfully!' });
    });

    this.express.use('/api/contract', router);

    // Handle 404
    this.express.use((req, res) => {
      console.log('hello');

      res.status(404).json({
        success: false,
        message: 'Not Found.',
      });
    });

    this.express.use(errorHandler);
  }

  configureApp = (app: Application) => {
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // Initialize other configurations as needed
  };

  private async config(): Promise<void> {
    this.configureApp(this.express);
  }
}

export default new App().express;
