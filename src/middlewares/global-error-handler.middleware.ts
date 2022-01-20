import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers';
import log4js from 'log4js';

const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL;

@Middleware({ type: 'after' })
export class GlobalErrorHandler implements ExpressErrorMiddlewareInterface {
  error (error: any, request: any, response: any, next: () => any) {
    logger.error(error);
    response.status(error.statusCode || error.httpCode).json(error);
    next();
  }
}