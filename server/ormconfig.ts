require('dotenv').config();

module.exports = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: 'splat',
  synchronize: true,
  logging: true,
  entities: ['dist/entities/**/*.js'],
  migrations: ['dist/migration/**/*.js'],
  subscribers: ['dist/subscriber/**/*.js'],
  cli: {
    entitiesDir: 'entity',
    migrationsDir: 'migration',
    subscribersDir: 'subscriber',
  },
};
