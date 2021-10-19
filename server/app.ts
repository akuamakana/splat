import { createConnection } from 'typeorm';
import * as dotenv from 'dotenv';
import express from 'express';
import { routes } from './routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'reflect-metadata';
import logger from './middleware/logger';

dotenv.config();

const app = express();

var corsOptions = {
  origin: 'http://localhost:3000',
};

createConnection();

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

routes.hello(app);
routes.auth(app);

app.listen(process.env.PORT || 8080, () => {
  logger.info(`Server is running on http://localhost:${process.env.PORT}`);
});
