import supertest from 'supertest';
import app from '../src/index';

export function getRequest() {
  return supertest(app);
}

export function stopServer() {
  app.close();
}