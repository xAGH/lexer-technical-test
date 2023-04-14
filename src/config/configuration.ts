import dotenv from "dotenv"
import { AppOptions, DatabaseOptions } from "../domain/types"

dotenv.config()

export class Configuration {

  static readonly APP: AppOptions = {
    HOST: process.env.APP_HOST ?? "localhost",
    PORT: parseInt(process.env.APP_PORT ?? "1234"),
    ENVIRONMENT: process.env.APP_ENVIRONMENT ?? "development",
    VERSION: process.env.APP_VERSION ?? "/api/v01"
  }

  static readonly DATABASE: DatabaseOptions = {
    HOST: process.env.DB_HOST ?? "localhost",
    PORT: parseInt(process.env.DB_PORT ?? "5432"),
    NAME: process.env.DB_NAME ?? "employees-ms",
    PASSWORD: process.env.DB_PASS ?? "lexer-employees-pass",
    USER: process.env.DB_USER ?? "lexer-employees-user",
  }

}
