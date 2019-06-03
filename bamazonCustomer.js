var mysql = require("mysql");
var inquirer = require("inquirer");

//connect to the database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Metropcs1",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Welcome to Bamazon, the world's larget online store!")
    showInventory();
    placeOrder();
    // console.log("connected as id " + connection.threadId + "\n");
});

//function to see if the user would like to check stock

function showInventory() {
    inquirer
        .prompt([
            {
                type: "confirm",
                message: "Would you like to see the inventory?",
                name: "confirm",
                default: true
            }
        ])
        .then(function (inquirerResponse) {
            if (inquirerResponse.confirm) {
                console.log("All Products: \n");
                console.log("ID#   ||   Name   ||    Price \n");
                connection.query("SELECT item_id, product_name, price FROM products", function (err, res) {
                    if (err) throw err;
                    console.log(res);
                    connection.end();
                });
            }
            else {
                console.log("\nThat's okay, maybe next time.\n");
            }
        });

}

function placeOrder() {
    console.log("PLACE AN ORDER: \n")
    inquirer
        .prompt([
            {
                type: "checkbox",
                message: "What is the ID# of the product(s) you would like to buy?",
                choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                name: "selected items"
            },
        ])
        .then(function (inquirerResponse) {
            if (inquirerResponse.confirm) {
                addQuantity();
            }else {
            console.log("\nThat's okay, maybe next time.\n");
            }
         });

}


function addQuantity() {
    
inquirer
    .prompt([
        {
            type: "input",
            message: "How many units would you like?",
            name: "quantity"
        },
    ]).then(function (inquirerResponse) {
        if (inquirerResponse.confirm) {
            console.log("All Products: \n");
            console.log("ID#   ||   Name   ||    Price \n");
            connection.query("SELECT item_id, product_name, price FROM products", function (err, res) {
                if (err) throw err;
                console.log(res);
                connection.end();
            });
        }