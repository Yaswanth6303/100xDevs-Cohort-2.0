# Docker Networking Issue: Node.js Container Not Connecting to MongoDB Container

## Problem Description

I am running a **Node.js application** and **MongoDB**, both inside **separate Docker containers**.

The Node.js container starts successfully and shows the message **“Server running”**, but it does **not display “MongoDB connected”**.

This happens because the Node.js container is **unable to connect to the MongoDB container**.

---

## Initial Setup

### Create a Docker volume

```bash
docker volume create c2-w15-3-volume
```

### Run MongoDB container (without Docker network)

```bash
docker run --name c2-w15-3-docker-compose-networks \
  -p 27018:27017 \
  -v mongo_db_data:/data/db \
  mongo
```

### Build Node.js application image

```bash
docker build -t c2_w15-3_image-docker-compose-networks .
```

### Run Node.js container

```bash
docker run -p 3000:3000 c2_w15-3_image-docker-compose-networks
```

At this point:

- The server starts successfully.
- MongoDB does **not** connect.

---

## Root Cause of the Issue

In `src/db.ts`, the MongoDB connection string was:

```tsx
const mongoUrl: string = 'mongodb://localhost:27018/docker-networks?authSource=admin';
```

### Why this fails

- Inside a Docker container, **`localhost` refers to the container itself**, not the host machine.
- MongoDB is running in **another container**, not inside the Node.js container.
- Port `27018` is a **host-mapped port**, which containers cannot use to talk to each other.

As a result, the Node.js container cannot find MongoDB and the connection fails.

---

## Solution: Use Docker Networks

To allow containers to communicate with each other, we must use a **Docker network**.

---

## Step 1: Create a Docker Network

```bash
docker network create c2_w15-3_network
```

---

## Step 2: Stop and Remove Old Containers

```bash
docker stop c2-w15-3-docker-compose-networks
docker rm c2-w15-3-docker-compose-networks
```

(This was done only for testing and cleanup.)

---

## Step 3: Run MongoDB Container on the Network

```bash
docker run -d \
  --name c2-w15-3-docker-compose-networks \
  --network c2_w15-3_network \
  -p 27018:27017 \
  -v mongo_db_data:/data/db \
  mongo
```

Now MongoDB is:

- Running on Docker network `c2_w15-3_network`
- Listening internally on port `27017`

---

## Step 4: Update MongoDB Connection String

Replace `localhost` with the **MongoDB container name** and use the **internal MongoDB port (27017)**.

```tsx
const mongoUrl: string =
  'mongodb://c2-w15-3-docker-compose-networks:27017/docker-networks?authSource=admin';
```

### Why this works

- Docker provides **automatic DNS resolution** using container names.
- Containers communicate using **internal ports**, not host-mapped ports.

---

## Step 5: Rebuild the Node.js Image

```bash
docker build -t c2_w15-3_image-docker-compose-networks .
```

---

## Step 6: Run Node.js Container on the Same Network

```bash
docker run \
  --name c2-w15-3-node-app \
  --network c2_w15-3_network \
  -p 3000:3000 \
  c2_w15-3_image-docker-compose-networks
```

Now:

- Both containers are on the **same Docker network**
- The Node.js app can resolve and connect to MongoDB

---

## Final Result

When the Node.js container starts, it correctly displays:

```
MongoDB connected
Server running at http://localhost:3000
```

---

## Key Takeaways

- `localhost` inside a container refers **only to that container**
- Containers must use **Docker networks** to communicate
- Use **container names** instead of `localhost`
- Use **internal container ports**, not host-mapped ports

### Equivalent `docker-compose.yml` file

- Includes `build` also

```bash
services:
  mongo:
    image: mongo
    container_name: c2-w15-3-docker-compose-networks
    ports:
      - "27018:27017"
    volumes:
      - mongo_db_data:/data/db
    networks:
      - c2_w15-3_network

  node-app:
    build: .
    container_name: c2-w15-3-node-app
    ports:
      - "3000:3000"
    depends_on:
      - mongo
    networks:
      - c2_w15-3_network

volumes:
  mongo_db_data:

networks:
  c2_w15-3_network:
    driver: bridge

```
