import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

async function main() {
  await producer.connect();

  /*
    ==========================================================
    USING A MESSAGE KEY TO CONTROL PARTITION ASSIGNMENT
    ==========================================================

    Topic: "answer-submitted"
    Partitions: 3 (Partition 0, 1, 2)

    We are setting:
        key: "user-123"

    Why?

    Kafka uses the message key to decide which partition
    the message should go to.

    Internally:
        partition = hash(key) % numberOfPartitions

    This guarantees:
      - All messages with key "user-123"
        always go to the SAME partition.
      - Ordering is preserved for that user.
  */

  await producer.send({
    topic: "answer-submitted",
    messages: [
      {
        key: "user-123", // Partition key
        value: "Answer has submitted successfully",
      },
    ],
  });

  await producer.disconnect();
}

main();

/*
  ==========================================================
  WHY THIS DESIGN IS IMPORTANT
  ==========================================================

  1) Same User → Same Partition
     - All events for "user-123" always go to one partition.
     - That partition processes messages sequentially.
     - This guarantees strict ordering for that user.

  2) Protection Against Abuse (Example: Repeated Requests / DDoS)
     - If a single user sends many repeated requests:
         → Only ONE partition becomes busy.
         → Other partitions continue working normally.
     - System remains partially available.

  3) Sequential Processing Guarantee
     - Kafka guarantees order within a partition.
     - Since all events for a user go to the same partition:
         → That user’s events are processed in order.
         → No race conditions for that user.

  4) Parallelism Still Exists
     - Other users (e.g., user-456, user-789)
       will likely be mapped to different partitions.
     - Their events are processed in parallel.

  5) Multiple Consumer Groups
     - If different consumer groups subscribe:
         → Each group processes messages independently.
         → Parallel processing across groups.
*/
