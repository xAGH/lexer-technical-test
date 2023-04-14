import express, { Application } from 'express';
import { ApiConfig, Configuration, PostgresDataSource } from './config';

/** Typeorm datasource initialization.
 * @see https://orkhan.gitbook.io/typeorm/docs/data-source
*/
PostgresDataSource.initialize()
  .then(() => {
    console.log("The data source has been initialized successfully.")
  })
  .catch((err) => {
    console.error("Error during data source initialization, check your data source configuration.\n", err)
  })

const app: Application = express();

/** Application configuration -> Adding routes, cors configuration and
 * middlewaresto the app
 * */
ApiConfig.configure(app);

/** Application run */
app.listen(Configuration.APP.PORT, () => {
  console.log(`Server listening on port ${Configuration.APP.PORT}.`);
});
