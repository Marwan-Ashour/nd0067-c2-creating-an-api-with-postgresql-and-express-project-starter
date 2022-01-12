# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index: /products - GET
- Show : /products/:id - GET
- Create [token required] : /products/create - POST


#### Users
- Index [token required] : /users - GET
- Show [token required] : /users/:id - GET
- Create N[token required] : /users/create - POST
- signIn: /users/signn - POST

#### Orders
- Current Order by user (args: user id)[token required]: show/orders/user/:id - GET


## Data Shapes
#### Product
-   product_id SERIAL PRIMARY KEY,
- product_name VARCHAR(64) NOT NULL,
- product_price integer NOT NULL



#### User
- user_id SERIAL PRIMARY KEY,
- user_name VARCHAR(100),
- first_name VARCHAR(150),
- last_name VARCHAR(200),
- user_password VARCHAR(250)


#### Orders
- order_id SERIAL PRIMARY KEY,
- user_id integer  NOT NULL,
- order_status VARCHAR(50) NOT NULL,
    CONSTRAINT fk_user
    FOREIGN KEY(user_id)
	  REFERENCES users(user_id)

#### order_products 
-   order_products_id SERIAL PRIMARY KEY,
-  product_quantity integer,
- order_id integer REFERENCES orders(order_id), 
- product_id integer REFERENCES products(product_id)   



