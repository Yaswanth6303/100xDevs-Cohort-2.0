import { Kafka } from "kafkajs";

/*
  Create a Kafka client instance.
  - clientId identifies this application inside Kafka logs.
  - brokers is the list of Kafka servers to connect to.
*/
const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

/*
  Create a producer instance from the Kafka client.
  This producer will be responsible for sending messages.
*/
const producer = kafka.producer();

/*
  Main async function to handle connection and message sending.
*/
async function main() {
  try {
    /*
      Step 1: Connect to Kafka broker.
      Must be done before sending messages.
    */
    await producer.connect();

    /*
      Step 2: Send message to a specific topic.
      - topic: where the message will be stored
      - messages: array of messages to send
    */
    await producer.send({
      topic: "quickstart-events",
      messages: [
        {
          value: "hi there",
        },
      ],
    });

    console.log("Message sent successfully");
  } catch (error) {
    /*
      If any error occurs during connection or sending,
      it will be caught here.
    */
    console.error("Error sending message:", error);
  } finally {
    /*
      Step 3: Always disconnect the producer.
      This releases network resources properly.
    */
    await producer.disconnect();
  }
}

/*
  Execute the main function.
*/
main();
