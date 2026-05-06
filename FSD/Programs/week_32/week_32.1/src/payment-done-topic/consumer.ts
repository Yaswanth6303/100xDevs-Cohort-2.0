import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

/*
  =====================================================
  KAFKA CONSUMER GROUP WITH MULTIPLE PARTITIONS
  =====================================================

  Topic: "payment-done"
  Partitions: 3 (Partition 0, Partition 1, Partition 2)
  Consumer Group: "my-app-partition"

  Important Concepts:
  -------------------

  1) Consumer Group
     - All consumers using the same groupId belong to the same consumer group.
     - Kafka distributes partitions among consumers in that group.
     - Each partition is assigned to only ONE consumer within the group.

  2) Partition Assignment Rule
     - A partition can be consumed by only one consumer in a group.
     - A consumer can handle multiple partitions.
*/

const consumer = kafka.consumer({ groupId: "my-app-partition" });

async function main() {
  await consumer.connect();

  /*
    Subscribing to topic "payment-done".

    fromBeginning: true
      → Consumer reads messages from the earliest offset.
  */
  await consumer.subscribe({
    topic: "payment-done",
    fromBeginning: true,
  });

  /*
    consumer.run starts message consumption.

    Kafka assigns partitions to this consumer automatically
    as part of the consumer group coordination.
  */
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition: partition,
        offset: message.offset,
        value: message?.value?.toString(),
      });
    },
  });
}

main();

/*
  =====================================================
  CHECKING CONSUMER GROUP STATUS
  =====================================================

  Command used inside Docker:

  ./kafka-consumer-groups.sh \
    --bootstrap-server localhost:9092 \
    --describe \
    --group my-app-partition

  This command shows:
    - Consumer IDs
    - Assigned partitions
    - Current offsets
    - Lag
*/
