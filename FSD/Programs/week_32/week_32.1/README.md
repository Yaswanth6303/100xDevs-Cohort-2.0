### Commands to run

docker run --name c2_w32_1_kafka -p 9092:9092 apache/kafka:3.7.1
docker ps
docker exec -it container_id /bin/bash
cd /opt/kafka/bin

- To create a topic
  ./kafka-topics.sh --create --topic quickstart-events --bootstrap-server localhost:9092

- To publish a topic
  ./kafka-console-producer.sh --topic quickstart-events --bootstrap-server localhost:9092

- Open Multiple Terminal
- Consuming from the topic
  ./kafka-console-consumer.sh --topic quickstart-events --from-beginning --bootstrap-server localhost:9092

- Create a new topic with 3 partitions
  ./kafka-topics.sh --create --topic payment-done --partitions 3 --bootstrap-server localhost:9092

- Ensure it has 3 partitions
  ./kafka-topics.sh --describe --topic payment-done --bootstrap-server localhost:9092

While referring

1. index.ts
2. producer.ts and consumer.ts
3. src/payment-done-topic/
