import request from 'supertest';
import app from '../app.js';
import { connectDB, closeDB, clearDB } from './db.js';
import User from '../Models/user.js';
import dayjs from 'dayjs';
// Pass supertest agent for each test
const agent = request.agent(app);
// Setup connection to the database
beforeAll(async () => {
  await connectDB();
});
beforeEach(async () => {
  await clearDB();
});
afterAll(async () => {
  await closeDB();
});

describe('User Route', () => {
  const userData = {
    firstName: 'John',
    //  lastName: 'Doe',
    email: 'johndoe444@gmail.com',
  };

  
  it('GET /sign-up --> Missing lastname, dob and password', () => {
    return agent
      .post('/api/user/sign-up')
      .send(userData)
      .expect('Content-Type', /json/)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            lastName: 'Please enter an valid last name.',
            dob: 'Please enter an valid date',
            password: 'Password must be between 10 to 20 characters.',
            interest: 'Interest is required. Please enter your Interest.',
          }),
        );
      });
  });

  it('GET /sign-up --> under 18', () => {
    userData.password = 'Password12345';
    userData.lastName = 'Doe';
    userData.dob = '2008-10-20';
    userData.interest = 'menswear';
    return agent
      .post('/api/user/sign-up')
      .send(userData)
      .expect('Content-Type', /json/)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            dob: 'You must be 18 or older to use Glamo.',
          }),
        );
      });

    // some tests
  });

  it('GET /sign-up --> create user successfully', async () => {
    userData.dob = '2002-10-20';
    const response = await agent
      .post('/api/user/sign-up')
      .send(userData)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body).toEqual(
      expect.objectContaining({
        user: expect.objectContaining({
          firstName: userData.firstName,
          lastName: userData.lastName,
          interest: userData.interest,
          email: userData.email,
        }),
      }),
    );
  });
});
