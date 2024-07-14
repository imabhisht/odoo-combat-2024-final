const { log } = require("winston");
const FirebaseAdminController = require("./firebase_admin");
const logger = require("./logger");
const firebase_admin = new FirebaseAdminController()
const MongoService  = require("./mongodb");
const mongodb_client = new MongoService();
const kafka = require("./kafka");
module.exports = {
    firebase_admin:firebase_admin.app,
    logger,
    prisma: require("./prisma"),
    // mongodb_client : mongodb_client.connect().then((client) => {
    //     // ping the database to check if it's connected
    //     client.db("buildify").command({ ping: 1 }).then(() => {
    //         logger.info("[System] Connected to MongoDB Database")
    //     }).catch((err) => {
    //         logger.error("[System] Error connecting to MongoDB Database", err)
    //     });
    //     return client
    // }).catch((err) => {
    //     logger.error("[System] Error connecting to MongoDB Client", err)
    // })

    mongodb_client: mongodb_client.client,
    kafka,
    elasticSearch: require("./elastic")
}