import httpContext from 'express-http-context';

export function loggingBefore (request: any, response: any, next?: (err?: any) => any): any {
    console.log('set traceId = 123');
    httpContext.set('traceId', 123);
    console.log('do something Before...');
    next();
  }
  
  export function loggingAfter (request: any, response: any, next?: (err?: any) => any): any {
    console.log('do something After...');
    console.log(`tracedId = ${httpContext.get('traceId')}`);
    next();
  }