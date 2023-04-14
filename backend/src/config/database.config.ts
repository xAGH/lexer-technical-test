import { DataSource } from "typeorm"
import { Configuration } from "."
import { Environments } from "../domain/types"
import path from 'node:path';

export const PostgresDataSource = new DataSource({
    type: "postgres",
    host: Configuration.DATABASE.HOST,
    port: Configuration.DATABASE.PORT,
    username: Configuration.DATABASE.USER,
    password: Configuration.DATABASE.PASSWORD,
    database: Configuration.DATABASE.NAME,
    entities: [path.join(process.cwd(), '{dist,src}', '**', '*.entity.{js,ts}')],
    logging: Configuration.APP.ENVIRONMENT == Environments.DEVELOPMENT,
    synchronize: true,
})
