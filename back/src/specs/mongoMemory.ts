import * as mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

// All of this was pulled from:
// https://dev.to/paulasantamaria/testing-node-js-mongoose-with-an-in-memory-database-32np?fbclid=IwAR3Q5VzI7y7EVWO0mIfiULXfLIFqHHswzjArka48Vx5WLlz2tKcP5j9qFk4

const mongod = new MongoMemoryServer();

export const connect = async () => {
  const uri = await mongod.getConnectionString()

  const mongooseOpts = {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
  }

  await mongoose.connect(uri, mongooseOpts)
}

export const disconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
}

export const clear = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
}
