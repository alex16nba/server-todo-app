import cors from 'cors';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import helmet from 'helmet';

export default function initExpress(app) {
  app.use(cors());
  app.options('*', cors());

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  }));
  app.use(methodOverride());
  app.use(helmet());

  app.use((req, res, next) => {
    req.resources = req.resources || {};
    next();
  });
}
