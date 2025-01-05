import request from 'supertest';
import app from '../app.js';
import { connectDB, closeDB, clearDB } from './db.js';
import User from '../Models/user.js';
import dayjs from 'dayjs';
import { error } from 'ajv/dist/vocabularies/applicator/dependencies.js';
// Pass supertest agent for each test
const agent = request.agent(app);
// Setup connection to the database
beforeAll(async () => {
  await connectDB();
});
// beforeEach(async () => {
//   await clearDB();
// });
afterAll(async () => {
  await closeDB();
});
describe('Admin Route', () => {
  const userData = {
    firstName: 'John',
    //  lastName: 'Doe',
    email: 'johndoe444@gmail.com',
    password: 'Password12345',
    lastName: 'Doe',
    dob: '2002-10-20',
    interest: 'menswear',
    adminAccess: true,
  };

  describe('Admin Route user login', () => {
    it('GET /sign-up --> create admin user successfully', async () => {
      const response = await agent
        .post('/api/user/sign-up')
        .send(userData)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toEqual(
        expect.objectContaining({
          user: expect.objectContaining({
            adminAccess: true,
            email: userData.email,
          }),
        }),
      );
    });

    it('GET /admin/login--> fail login with wrong password', async () => {
      const response = await agent
        .post('/api/admin/login')
        .send({ email: userData.email, password: userData.password + 'random' }) // add additonal string to test login
        .expect(404);

      expect(response.body).toEqual(
        expect.objectContaining({
          success: false,
          error: expect.objectContaining({
            password: 'password doesnt match.',
          }),
        }),
      );
    });

    it('GET /admin/login--> login admin user successfully', async () => {
      //const user = await User.findOne({ email: userData.email });
      const response = await agent
        .post('/api/admin/login')
        .send(userData)
        .expect(303);
      expect(response['header']['location']).toEqual('/api/admin/check');
      expect(response.redirect).toBe(true);
    });

    it('GET /admin/check--> user is authenticated', async () => {
      const response = await agent
        .get('/api/admin/check')

        .expect(200);

      expect(response.body).toEqual(
        expect.objectContaining({
          success: true,
        }),
      );
    });
  });
  
  describe('Create Product --> ' , async() => {
    
  })
});
