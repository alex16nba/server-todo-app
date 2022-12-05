import path from 'path';

export default function initRoutes(app) {
  const basePath = path.join(__dirname, '../app/modules');

  app.use(require(`${basePath}/users/userRoutes.js`));
  app.use(require(`${basePath}/todos/todoRoutes.js`));
  app.use(require(`${basePath}/authentication/authenticationRoutes.js`));
}
