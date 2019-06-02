DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("soccer ball", "sports", 8.50, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cleats", "sports", 39.99, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("foundation", "beauty", 29.99, 28);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("mascara", "beauty", 7.50, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ipad", "electronics", 399.99, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("headphones", "electronics", 49.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("collar", "pets", 5.29, 2999);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("kibble", "pets", 24.99, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pants", "clothing", 59.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("jacket", "clothing", 79.99, 35);
