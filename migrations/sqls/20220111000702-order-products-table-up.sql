CREATE TABLE order_products (
    order_products_id SERIAL PRIMARY KEY,
    product_quantity integer,
    order_id integer REFERENCES orders(order_id), 
    product_id integer REFERENCES products(product_id)
    );
    