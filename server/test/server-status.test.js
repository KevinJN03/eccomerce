import request from 'supertest';
import app from '../app.js';
import db from './db.js';

// Pass supertest agent for each test

// Setup connection to the database
// beforeAll(async () => await db.connect());
// beforeEach(async () => await db.clear());
// afterAll(async () => await db.close());

describe('server-status', () => {
  it('GET /server-status --> OK', () => {
    return request(app)
      .get('/api/server-status')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({ success: true }),
        );
      });
    // some tests
  });
});
