const { MongoClient } = require('mongodb')
const logger = require("./logger")
const uri = process.env.MONGODB_URI

// Export mongodb client

// module.exports = new MongoClient("mongodb+srv://admin:admin@buildify-main.hwxwq82.mongodb.net/?retryWrites=true&w=majority&appName=Buildify-Main");


class MongoService {
    constructor() {
      try {
        this.client = (new MongoClient("mongodb+srv://admin:admin@buildify-main.hwxwq82.mongodb.net/?retryWrites=true&w=majority&appName=Buildify-Main")).db("buildify")
        // this.client.command({ping: 1}).then()
        this.client.collection("verification").createIndex({ "createdAt": 1 }, { expireAfterSeconds: 15 * 60 });

        logger.info("[System] Connected with MongoDB Database");
      } catch (error) {
        logger.error("[System] Error connecting to Firebase Admin:", error);
      }
    }
  }
  
module.exports = MongoService