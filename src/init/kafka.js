const { Kafka, logLevel } = require('kafkajs');
const logger = require('./logger');
const kafka = new Kafka({
  brokers: ['obliging-maggot-8816-eu2-kafka.upstash.io:9092'],
  ssl: true,
  sasl: {
      mechanism: 'scram-sha-256',
      username: 'b2JsaWdpbmctbWFnZ290LTg4MTYk2aO_ihLKTseivRE-UOUbCXe5reRXZNJW5Ac',
      password: 'NWU0OTdkY2UtZGRhOS00YWVhLTg0NmQtMDQzOTk5ODkyY2E1'
  },
  logLevel: logLevel.ERROR,
});

// kafka.admin().connect().then(() => {
//   logger.info('[System] Connected with Kafka Cluster');
// }).catch((error) => {
//   logger.error('[System] Connected with Kafka Cluster Failed', error);
// });

module.exports = kafka;