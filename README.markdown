# 🛒 Ecommerce-Pipeline with Kafka & ClickHouse

A lightweight event-driven simulation of an e-commerce order processing system using **Kafka** for event streaming and **ClickHouse** for high-speed analytical storage.

## 🧱 Tech Stack

- **Producer**: Node.js (Kafkajs)
- **Consumer**: Node.js + @clickhouse/client
- **Database**: ClickHouse
- **Broker**: Apache Kafka (with ZooKeeper)
- **Containerization**: Docker & Docker Compose

---

## 📦 Project Structure

```
Ecommerce-Pipeline/
├── docker-compose.yaml # Kafka, ZooKeeper, ClickHouse setup
├── orders.sql # ClickHouse table definition
├── sendEvent.js # Kafka producer - simulates order events
├── consumeAndInsert.js # Kafka consumer - inserts orders into ClickHouse
├── .env # Environment variables (optional)
├── README.md # Project documentation
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Ecommerce-Pipeline.git
cd Ecommerce-Pipeline
```

### 2. Start Services

```bash
docker-compose up -d
```

### 3. Simulate Orders

```bash
node sendEvent.js
```

### 4. Consume and Insert into ClickHouse

```bash
node consumeAndInsert.js
```

---

## 📄 ClickHouse Table Schema (orders.sql)

```sql
CREATE DATABASE IF NOT EXISTS ecommerce;

CREATE TABLE IF NOT EXISTS ecommerce.orders (
    orderId UUID,
    userId String,
    status String,
    created_at DateTime
) ENGINE = MergeTree
ORDER BY (created_at);
```

---

## 🧪 Sample Logs

### sendEvent.js

```
Kafka Connected.
Order status sent: OrderPlaced
Order status sent: Packed
...
```

### consumeAndInsert.js

```
Consumer connected to Kafka
Received order: {...}
Order inserted into ClickHouse: ORD123
```

---

## 📬 License

MIT
