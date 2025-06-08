const { Kafka } = require("kafkajs");
const { v4: uuidv4 } = require("uuid");

const kafka = new Kafka({
  clientId: "order-app",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();
const orderId = uuidv4();
const userId = "user_123";

const statuses = [
  "OrderPlaced",
  "PaymentInitiated",
  "PaymentProcessed",
  "InventoryChecked",
  "Packed",
  "Shipped",
  "OutForDelivery",
  "Delivered",
];

const SendOrder = async () => {
  try {
    await producer.connect();
    console.log("Kaka Connected.");
    for (const status of statuses) {
      console.log(status);
      const message = {
        id: orderId,
        user_id: userId,
        status,
        created_at: new Date()
          .toISOString()
          .replace("T", " ")
          .replace(/\.\d+Z$/, ""),
      };

      try {
        await producer.send({
          topic: "orders",
          messages: [{ value: JSON.stringify(message) }],
        });
        console.log(`Order status sent: ${status}`);
      } catch (error) {
        console.error(`Error sending message: ${error.message}`);
      }
    }

    await producer.disconnect();
  } catch (error) {}
};

SendOrder();
