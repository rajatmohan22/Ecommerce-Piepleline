CREATE DATABASE IF NOT EXISTS ecommerce;

CREATE TABLE IF NOT EXISTS ecommerce.orders(
    id UUID,
    user_id String,
    status String,
    created_at DateTime
) ENGINE = MergeTree
ORDER BY (created_at)