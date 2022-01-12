CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(100),
    first_name VARCHAR(150),
    last_name VARCHAR(200),
    user_password VARCHAR(250)
);