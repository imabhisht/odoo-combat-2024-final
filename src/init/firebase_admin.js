require('dotenv').config();
const admin = require("firebase-admin");
// const serviceAccount = require("./buildify-ai-firebase-adminsdk-gb80b-7fdb582ea1.json");
const logger = require("./logger");
const serviceAccount = require("./key.json");

class FirebaseService {
  constructor() {
    try {
      this.app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
      logger.info("[System] Connected with Firebase Admin");
    } catch (error) {
      logger.error("[System] Error connecting to Firebase Admin:", error);
    }
  }
}

module.exports = FirebaseService;