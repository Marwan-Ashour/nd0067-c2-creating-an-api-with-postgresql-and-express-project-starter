# Storefront Backend Project

## General:
- Fullstack JS Udacity ND program project
- Local OS used for testing this project is Windows

## How to handle this project?

### Instructions

* The API connects to a postgres database

- First step: create two databases (shoppings_dev and shoppings_test),
- second step: create a new user (shoppings_user), and grant him all priviliges to work on the databases,
- Third step: run the command "psql -U postgres" in a terminal to access postgres CLI, and then run the following:



* CREATE USER shoppings_user WITH PASSWORD 'YOUR_PASSWORD';
* CREATE DATABASE shoppings_dev;
* \c shoppings_dev;
* GRANT ALL PRIVILEGES ON DATABASE shoppings_dev TO shoppings_user;
* CREATE DATABASE shoppings_test;
* \c shoppings_test;
* GRANT ALL PRIVILEGES ON DATABASE shoppings_test TO shoppings_user;
* \q


## Commands and Scripts
### create .env file and add the environment variables as per the attached sample file (.envSimulation)

1- To install all packages 
- npm install

2- To run server on watching mode
- npm run watch

3- To compile the code from TS to JS 
- npm run build

4- To create (users, products, orders, and order_products) tables in shoppings_dev
- npm run test

5- To drop tables in shoppings_dev
- npm run migrate_down

6- To run tests
- npm run test1

### Ports
* Database: 5432
* Backend: 3000 (or specify another env var)
