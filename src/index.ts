import express, {Express, RequestHandler} from 'express'
import cors from 'cors';
import httpContext from 'express-http-context'
import bodyParser from 'body-parser'
import { useExpressServer } from 'routing-controllers';
import swaggerUi from 'swagger-ui-express';
import config from 'config'

import { UserController } from './controllers/user.controller';
import { GlobalErrorHandler } from './middlewares/global-error-handler.middleware';
import * as swaggerDocument from '../src/swagger/openapi.json';

const app: Express = express();
const port = config.get('PORT')

app.use(cors() as RequestHandler);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => console.log(`Running on port ${port}`));

app.use(bodyParser.json());

app.use(httpContext.middleware);

useExpressServer(app, {
    controllers: [UserController],
    middlewares: [GlobalErrorHandler],
    defaultErrorHandler: false
});

app.use((req, res, next) => {
    httpContext.ns.bindEmitter(req);
    httpContext.ns.bindEmitter(res);
});