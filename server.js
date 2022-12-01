import express from 'express';

import initExpress from './config/express';
import initHelmet from './config/helmet';
import { getSequelize } from './config/sequelize';
import initRoutes from './config/routes';
import initErrorHandling from './config/errorHandling';
import { PORT } from './config/index';

const app = express();
app.set('root', __dirname);

initExpress(app);
getSequelize();
initHelmet(app);
initRoutes(app);
initErrorHandling(app);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`App is running on port ${PORT}`);
  console.log(`PROCESS ENV = ${process.env.NODE_ENV}`);
});

module.exports = app;
