const { createClient } = require("@clickhouse/client");
const { Kafka } = require("kafkajs");

const clickhouse = createClient({
  host: "http://localhost:8123",
  username: "default",
  password: "mysecret",
});

const kafka = new Kafka({
  clientID: "orders-consumer",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "orders-group" });

const run = async () => {
  await consumer.connect();
  console.log("Consumer connected to Kafka");
  await consumer.subscribe({ topic: "orders", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const order = JSON.parse(message.value.toString());
        console.log(`Received order: ${JSON.stringify(order)}`);

        await clickhouse
          .insert({
            table: "ecommerce.orders",
            values: [order], // must be an array of objects
            format: "JSONEachRow",
          })
          .then(() => {
            console.log(
              `Order inserted into ClickHouse: ${JSON.stringify(order)}`
            );
          })
          .catch((error) => {
            console.error(`Error inserting into ClickHouse: ${error}`);
            if (error.errors) {
              error.errors.forEach((e, i) => {
                console.error(`Underlying error [${i}]:`, e);
              });
            }
          });
      } catch (error) {
        console.error(`Error processing message: ${error.message}`);
      }
    },
  });
};

run().catch((error) => console.error("Error in consumer run:", error));
