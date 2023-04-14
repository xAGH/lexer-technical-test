import express, { Application } from "express";
import morgan from 'morgan';
import helmet from 'helmet';
import cors, { CorsOptions } from 'cors';

import { departmentRouter, employeeRouter } from "../application/routes";
import { ErrorHandler } from "../application/controllers";

/**
 * Class that configure the application cors, routes and middlewares.
 */
export class ApiConfig {

  public static configure(app: Application): Application {
    this.addMiddlewares(app);
    this.addRoutes(app);
    return app;
  }

  private static get corsOptions(): CorsOptions {
    return {}
  }

  /**
   * Method that adds middlewares to the application
   * @param {Application}app Application instance to configure
   * @returns {Application} Instance received with middlewares.
   */
  private static addMiddlewares(app: Application): Application {
    app.use(helmet());  /** Headers protection */
    app.use(cors(this.corsOptions)); /** Cross origins protection */
    app.use(express.json()) /** Objects and prototypes serialization */
    app.use(morgan("dev")); /** Logging */
    app.use(ErrorHandler)

    return app;
  }

  /**
   * Method that adds routes to the application
   * @param {Application}app Application instance to configure
   * @returns {Application} Instance received with routes.
   */
  private static addRoutes(app: Application): Application {
    /** Healthcheck */
    app.get('/', (_, res) => {
      res.status(200).json({
        healthcheck: "Ok"
      })
    })
    app.use(employeeRouter)
    app.use(departmentRouter)
    return app;
  }

}
