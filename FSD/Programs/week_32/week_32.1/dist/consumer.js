import { Kafka } from "kafkajs";
const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"],
});
/*
  ================================
  KAFKA CONSUMER GROUP EXPLANATION
  ================================

  1) Producer and Consumer Setup
     - A producer sends messages to a Kafka topic.
     - Consumers read messages from that topic.
     - Consumers can belong to a consumer group.

  2) Consumer Group Behavior
     - When you run: npm run consumer
       the consumer connects to Kafka using the groupId "test-group".
     - If multiple consumers use the SAME groupId,
       they all belong to the same consumer group.

  3) Load Balancing in Same Consumer Group
     - Kafka distributes messages among consumers in the same group.
     - However, distribution depends on PARTITIONS.

  4) Important Rule: One Partition = One Active Consumer Per Group
     - In this example, the topic has ONLY ONE PARTITION.
     - If there is only one partition:
         → Only ONE consumer in the group will receive all messages.
         → Other consumers in the same group will remain idle.
     - This is NOT because Kafka fails to load balance.
       It is because load balancing happens at the partition level.

  5) Example Scenario (Same Group)
     - 1 Producer
     - 2 Consumers
     - Both in groupId: "test-group"
     - Topic has 1 partition

     Result:
       → All messages go to only ONE consumer.
       → The second consumer does not receive messages.
       → If the active consumer crashes,
         Kafka automatically assigns the partition to the other consumer.
         Then the second consumer starts receiving messages.

  6) Multiple Partitions Scenario
     - If the topic had 3 partitions:
         → Kafka could distribute partitions across consumers.
         → Example:
             Consumer 1 → Partition 0
             Consumer 2 → Partition 1
             Consumer 3 → Partition 2
         → This is true load balancing.

  7) Different Consumer Groups
     - If 3 consumers use DIFFERENT groupIds:
         → Each group gets its own copy of the messages.
         → All 3 consumers will receive ALL messages.
     - Because Kafka tracks offsets per consumer group.

  Summary:
     - Load balancing happens across partitions.
     - Same group + single partition = only one active consumer.
     - Same group + multiple partitions = distributed processing.
     - Different groups = each group receives all messages.
*/
const consumer = kafka.consumer({ groupId: "test-group" });
async function main() {
    await consumer.connect();
    await consumer.subscribe({
        topic: "quickstart-events",
        fromBeginning: true,
    });
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
//# sourceMappingURL=consumer.js.map