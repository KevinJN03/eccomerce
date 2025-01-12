import request from 'supertest';
import app from '../app.js';
const agent = request.agent(app);
export default agent