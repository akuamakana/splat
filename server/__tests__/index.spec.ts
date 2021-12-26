import { Server } from 'http';
import { Application } from 'express';
// import { createConnection, getConnection } from 'typeorm';
import app from '../app';
import redisClient from '../lib/redisClient';
import logger from '../lib/logger';

const request = require('supertest');
const PORT = process.env.PORT;

describe('tracker server', () => {
  let application: Application;
  let server: Server;
  const user = {
    username: 'test',
    password: 'test',
    email: 'test@gmail.com',
    firstName: 'test',
    lastName: 'test',
  };

  beforeAll(async () => {
    // await createConnection();
    // const entities = getConnection().entityMetadatas;

    // for (const entity of entities) {
    //   const repository = getConnection().getRepository(entity.name); // Get repository
    //   await repository.clear(); // Clear each entity table's content
    // }
    application = await app();
    server = application.listen(PORT, () => logger.info(`Server is running on http://localhost:${process.env.PORT}`));
  });

  afterAll(async () => {
    await redisClient.flushall();
    await redisClient.disconnect();
    await redisClient.quit();
    server.close();
  });

  describe('GET /', () => {
    it('should return 200', async () => {
      const response = await request(server).get('/');
      expect(response.status).toBe(200);
      expect(response.text).toEqual('Hello world');
    });
  });

  describe('AUTH route', () => {
    describe('POST /auth/register', () => {
      it.skip('should return 201 and successfully create user', async () => {
        const response = await request(server).post('/auth/register').send(user);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(true);
      });

      it('should return 400 with no password', async () => {
        const response = await request(server)
          .post('/auth/register')
          .send({ ...user, username: 'test2', password: '', email: 'test2@gmail.com' });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ field: 'password', message: 'Password is required' });
      });

      it('should return 400 with password less than 4 characters', async () => {
        const response = await request(server)
          .post('/auth/register')
          .send({ ...user, username: 'test2', email: 'test2@gmail.com', password: '123' });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ field: 'password', message: 'Password must be more than 3 characters' });
      });

      it('should return 400 with no email', async () => {
        const response = await request(server)
          .post('/auth/register')
          .send({
            ...user,
            email: '',
          });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ field: 'email', message: 'Email is required' });
      });

      it('should return 400 with invalid email', async () => {
        const response = await request(server).post('/auth/register').send({
          username: 'test2',
          password: 'test',
          email: 'test',
        });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ field: 'email', message: 'Invalid email' });
      });

      it('should return 400 with no username', async () => {
        const response = await request(server)
          .post('/auth/register')
          .send({ ...user, username: '' });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ field: 'username', message: 'Username is required' });
      });

      it('should return 400 with username less than 4 characters', async () => {
        const response = await request(server)
          .post('/auth/register')
          .send({
            ...user,
            username: '123',
            email: 'test123@gmail.com',
            password: 'test',
          });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ field: 'username', message: 'Username must be more than 3 characters' });
      });

      it('should return 400 with "@" in username', async () => {
        const response = await request(server)
          .post('/auth/register')
          .send({
            ...user,
            username: '123@',
            email: 'test123@gmail.com',
            password: 'test',
          });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ field: 'username', message: 'Username cannot include @' });
      });

      it('should return 400 with duplicate email', async () => {
        const response = await request(server)
          .post('/auth/register')
          .send({
            ...user,
            username: 'test2',
            password: 'test',
          });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ field: 'email', message: 'Email is already in use.' });
      });

      it('should return 400 with duplicate username', async () => {
        const response = await request(server)
          .post('/auth/register')
          .send({ ...user, email: 'test2@gmail.com' });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ field: 'username', message: 'Username is already taken.' });
      });
    });

    describe('POST /auth/login', () => {
      it('should return 200 with username login', async () => {
        const response = await request(server).post('/auth/login').send({
          usernameOrEmail: 'test',
          password: 'test',
        });
        expect(response.status).toBe(200);
        expect(response.body).toEqual(true);
      });

      it('should return 200 with email login', async () => {
        const response = await request(server).post('/auth/login').send({
          usernameOrEmail: 'test@gmail.com',
          password: 'test',
        });
        expect(response.status).toBe(200);
        expect(response.body).toEqual(true);
      });

      it('should return 404', async () => {
        const response = await request(server).post('/auth/login').send({
          usernameOrEmail: 'ouijhaskdjhasdkjf',
          password: 'test1',
        });
        expect(response.status).toBe(404);
      });

      it('should return 401', async () => {
        const response = await request(server).post('/auth/login').send({
          usernameOrEmail: 'test',
          password: 'aasfasdfzxgbvsdfg',
        });
        expect(response.status).toBe(401);
        expect(response.body).toEqual({ field: 'password', message: 'Invalid password' });
      });

      it('should return 500', async () => {
        const response = await request(server).post('/auth/login').send({
          usernameOrEmail: 'test',
        });
        expect(response.status).toBe(500);
      });
    });

    describe('DELETE /auth/logout', () => {
      it('should return 200', async () => {
        const response = await request(server).delete('/auth/logout');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(true);
      });
    });
  });
});
