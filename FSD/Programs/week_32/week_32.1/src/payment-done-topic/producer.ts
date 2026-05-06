import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

/*
  ================================
  KAFKA PRODUCER WITH PARTITIONS
  ================================

  1) Topic Creation
     The following command was used to create the topic:

     ./kafka-topics.sh --create \
       --topic payment-done \
       --partitions 3 \
       --bootstrap-server localhost:9092

     Explanation:
       - Topic name: "payment-done"
       - Number of partitions: 3
       - Kafka broker running on localhost:9092

     This means the topic "payment-done" now contains 3 partitions.
     Example:
         payment-done
           ├── Partition 0
           ├── Partition 1
           └── Partition 2

  2) Why Partitions Matter
     - Partitions allow Kafka to scale horizontally.
     - Messages are distributed across partitions.
     - Multiple consumers (in the same group) can process messages in parallel
       if multiple partitions exist.
     - Ordering is guaranteed only within a single partition.

  3) Producer Behavior
     - The producer sends messages to the topic.
     - Since no partition or key is explicitly specified here,
       Kafka will automatically choose a partition.
     - By default, Kafka uses a partitioning strategy (round-robin
       or sticky partitioner depending on configuration).

     Important:
       - If you send messages without a key,
         they may go to different partitions.
       - If you send messages with the same key,
         Kafka ensures they go to the same partition.
*/

const producer = kafka.producer();

async function main() {
  try {
    // Connect the producer to the Kafka broker
    await producer.connect();

    /*
      Sending a message to the topic "payment-done".

      Since no partition is specified:
        → Kafka automatically selects one of the 3 partitions.
        → The message will be stored in either Partition 0, 1, or 2.

      If multiple messages are sent:
        → They may be distributed across partitions.
    */
    await producer.send({
      topic: "payment-done",
      messages: [
        {
          value:
            "Hello from payment-done topic, 3 partitions are already created",
        },
      ],
    });

    console.log("Message sent successfully");
  } catch (error) {
    // If any error occurs while connecting or sending,
    // it will be caught here.
    console.error("Error sending message:", error);
  } finally {
    // Always disconnect the producer after sending messages
    // to properly release network resources.
    await producer.disconnect();
  }
}

main();
