const { Kafka, logLevel } = require('kafkajs');
const logger = require('./logger');
const kafka = new Kafka({
  brokers: ['stirring-glowworm-14525-eu2-kafka.upstash.io:9092'],
  ssl: true,
  sasl: {
      mechanism: 'scram-sha-256',
      username: process.env.KAFKA_USERNAME,
      password: process.env.KAFKA_PASSWORD,
  },
  logLevel: logLevel.ERROR,
});

// kafka.admin().connect().then(() => {
//   logger.info('[System] Connected with Kafka Cluster');
// }).catch((error) => {
//   logger.error('[System] Connected with Kafka Cluster Failed', error);
// });

module.exports = kafka;