import mongoose, { Mongoose } from 'mongoose';

require('../models/User');

interface IMongoose {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

if (!process.env.DATABASE_URL) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const { DATABASE_URL } = process.env;

const globalWithMongoose = global as typeof globalThis & {
  mongoose: IMongoose;
};

let cached = globalWithMongoose.mongoose;

if (!cached) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
  cached = globalWithMongoose.mongoose;
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(DATABASE_URL, opts).then((db) => db);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
