import { Kafka } from "kafkajs";
const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"],
});
const producer = kafka.producer();
// ./kafka-topics.sh --create --topic payment-done --partitions 3 --bootstrap-server localhost:9092
// By this i have created 3 partitions and i have named the topic name as payment-done. Inside it 3 partitions
// are created.
async function main() {
    try {
        await producer.connect();
        await producer.send({
            topic: "payment-done",
            messages: [
                {
                    value: "Hello from payment-done topic, 3 partitions are already created",
                },
            ],
        });
        console.log("Message sent successfully");
    }
    catch (error) {
        console.error("Error sending message:", error);
    }
    finally {
        await producer.disconnect();
    }
}
main();
//# sourceMappingURL=producer.js.map