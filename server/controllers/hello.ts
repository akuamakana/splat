import { Response } from 'express';

export const hello = (response: Response) => {
  response.status(200).send('Hello world');
};
