import 'reflect-metadata';

import * as dotenv from 'dotenv';

import connectRedis from 'connect-redis';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { createConnection } from 'typeorm';
import express from 'express';
import logger from './lib/logger';
import { routes } from './routes';
import session from 'express-session';
import redisClient from './lib/redisClient';

var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

const main = async () => {
  dotenv.config();
  const app = express();
  await createConnection();

  const RedisStore = connectRedis(session);

  app.use(
    session({
      name: process.env.COOKIE_NAME,
      secret: process.env.SESSION_SECRET as string,
      cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 * 10, httpOnly: true, secure: false, sameSite: 'lax' },
      saveUninitialized: false,
      resave: false,
      store: new RedisStore({ client: redisClient, disableTouch: true }),
    })
  );
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors(corsOptions));
  app.use(cookieParser());

  routes.hello(app);
  routes.auth(app);
  routes.project(app);
  routes.user(app);
  routes.ticket(app);
  routes.comment(app);
  routes.notification(app);
  routes.report(app);

  app.listen(process.env.PORT || 8080, () => {
    logger.info(`Server is running on http://localhost:${process.env.PORT}`);
  });
};

main().catch((err) => logger.error(err));
