import Redis from 'ioredis';

const redisOptions = process.env.REDIS_HOST
  ? {
      host: process.env.REDIS_HOST,
      port: 6379,
    }
  : {};

const redisClient = new Redis(redisOptions);

export default redisClient;
