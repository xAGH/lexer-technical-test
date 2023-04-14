import express, { Application } from 'express';
import { PostgresDataSource } from './config/database.config';
import { Configuration } from './config';
import { AttachMiddlewares } from './infrastructure/middleware/attach-middlewares.middleware';
import { router } from './infrastructure/controllers/employee.controller';

PostgresDataSource
.initialize()
.then(() => {
  console.log("Data Source has been initialized!")
})
.catch((err) => {
  console.error("Error during Data Source initialization:", err)
})

const app: Application = express();

AttachMiddlewares.add(app);
app.use(router)

app.listen(Configuration.APP.PORT, () => {
  console.log(`Server listening on port ${Configuration.APP.PORT}.`);
});
