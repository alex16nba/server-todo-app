import path from 'path';

export default function initRoutes(app) {
  const routesPath = path.join(__dirname, '../app/modules');
  const routes = ['todos', 'authentication'];

  routes.forEach((route) => {
    const finalPath = `${routesPath}/${route}/routes`;
    // eslint-disable-next-line
    app.use(require(finalPath));
  });
}
