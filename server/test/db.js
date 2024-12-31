import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;



// Provide connection to a new in-memory database server.
const connectDB = async () => {
  try {
    // before establishing a new connection close previous
    await mongoose.disconnect();

  mongoServer = await MongoMemoryServer.create();
  const mongoUri = await mongoServer.getUri();
     await mongoose.connect(mongoUri);
  } catch (err) {
    console.error(err);
  }
};

// Remove and close the database and server.
const closeDB = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};

// Remove all data from collections
const clearDB = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany();
  }
};

module.exports = {
    connectDB,
  closeDB,
  clearDB,
};