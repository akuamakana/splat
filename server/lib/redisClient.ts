import Redis from 'ioredis';
import * as dotenv from 'dotenv';

dotenv.config();

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: 6379,
});

export default redisClient;
