require('dotenv').config();
const admin = require("firebase-admin");
// const serviceAccount = require("./buildify-ai-firebase-adminsdk-gb80b-7fdb582ea1.json");
const logger = require("./logger");

class FirebaseService {
  constructor() {
    try {
      this.app = admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
          clientX509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL,
          authUri: process.env.FIREBASE_AUTH_URI,
          tokenUri: process.env.FIREBASE_TOKEN_URI,
          authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
          clientC509CertUrl: process.env.FIREBASE_CLIENT_C509_CERT_URL,

        })
      });
      logger.info("[System] Connected with Firebase Admin");
    } catch (error) {
      logger.error("[System] Error connecting to Firebase Admin:", error);
    }
  }
}

module.exports = FirebaseService;