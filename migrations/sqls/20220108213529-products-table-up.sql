CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(64) NOT NULL,
    product_price integer NOT NULL
);