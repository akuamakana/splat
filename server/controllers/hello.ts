import { Response, Request } from 'express';

export const hello = (_: Request, response: Response) => {
  response.send('Hello world');
  return;
};
