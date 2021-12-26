require('dotenv-safe').config();

const tsEntities = process.env.NODE_ENV === 'test' ? 'entities/**/*.ts' : '';
const tsMigration = process.env.NODE_ENV === 'test' ? 'migration/**/*.ts' : '';

module.exports = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: true,
  logging: true,
  entities: ['dist/entities/**/*.js', './entities/**/*.js', tsEntities],
  migrations: ['dist/migration/**/*.js', tsMigration],
  subscribers: ['dist/subscriber/**/*.js'],
  cli: {
    entitiesDir: 'entity',
    migrationsDir: 'migration',
    subscribersDir: 'subscriber',
  },
};
