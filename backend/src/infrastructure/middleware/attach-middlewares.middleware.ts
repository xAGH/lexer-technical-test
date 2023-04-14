import { Application } from "express";
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';

export class AttachMiddlewares {

  private static get corsOptions() {
    return{}
  }

  static add(app: Application): Application {
    app.use(bodyParser)
    app.use(helmet());
    app.use(cors(this.corsOptions));
    app.use(morgan("dev"));

    return app;
  }

}
