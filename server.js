import express from 'express';

// Configs
import initExpress from './config/express';
import { getSequelize } from './config/sequelize';
import initRoutes from './config/routes';
import initErrorHandling from './config/errorHandling';
import { PORT } from './config/envConfig';

const app = express();
app.set('root', __dirname);

initExpress(app);
getSequelize();
initRoutes(app);
initErrorHandling(app);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`App is running on port ${PORT}`);
});

module.exports = app;
