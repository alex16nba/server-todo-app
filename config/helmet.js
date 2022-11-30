import helmet from 'helmet';

export default function initHelmet(app) {
  app.use(helmet());
}
