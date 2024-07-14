const { MongoClient } = require('mongodb');
const logger = require('./logger'); // Assuming you have a logger module

const uri = process.env.MONGODB_URI || "mongodb+srv://admin:admin@testdatabase.ykvndzo.mongodb.net/?retryWrites=true&w=majority&appName=TestDatabase";

async function initializeMongoDB() {
  try {
    console.log(uri)
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 30000,
    //   keepAlive: true,
    });

    await client.connect();
    const db = client.db('odoo');

    await db.collection('verification').createIndex({ "createdAt": 1 }, { expireAfterSeconds: 15 * 60 });

    logger.info('[System] Connected with MongoDB Database');

    // Return the db instance for use in other parts of your application
    return db;
  } catch (error) {
    logger.error('[System] Error connecting to MongoDB:', error);
    throw error; // Optionally rethrow the error if you want to handle it higher up in the call stack
  }
}

module.exports = initializeMongoDB();
