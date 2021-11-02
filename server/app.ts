import { createConnection } from 'typeorm';
import * as dotenv from 'dotenv';
import express from 'express';
import { routes } from './routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'reflect-metadata';
import logger from './lib/logger';
import session from 'express-session';
import redis from 'redis';
import connectRedis from 'connect-redis';

var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

const main = async () => {
  dotenv.config();
  const app = express();
  createConnection();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

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

  app.listen(process.env.PORT || 8080, () => {
    logger.info(`Server is running on http://localhost:${process.env.PORT}`);
  });
};

main().catch((err) => logger.error(err));
