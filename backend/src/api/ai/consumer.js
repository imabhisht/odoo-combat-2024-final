const { logger,firebase_admin, prisma,kafka, mongodb_client } = require("../../init")
const consumer = kafka.consumer({ groupId: 'project-creator'});

module.exports.projectCreatorConsumer = async () => {
    try {
        await consumer.connect();
        await consumer.subscribe({ topic: 'code-generation', fromBeginning: true }).then(() => {
            logger.info("[Kafka] Subscribed to code-generation topic")
        });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
              console.log({
                partition,
                offset: message.offset,
                value: message.value.toString(),
              });

              const data = JSON.parse(message.value.toString());
              const { project_id, config } = data;
              //console.log("Data",data)

              fetch(`${process.env.BACKEND_AI}/ai/generate/website`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log('Success:', data);
                })
                .catch((error) => {
                  console.error('Error:', error);
                });
              }
          });

    } catch (error) {
        logger.error("Error in projectCreatorConsumer", error)
        throw  error
    }
}
