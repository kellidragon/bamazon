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
    console.log("--------------------------------------------------------\n")
    console.log("\nWELCOME TO BAMAZON, THE WORLD'S LARGEST ONLINE STORE!\n")
    console.log("--------------------------------------------------------\n")
    showInventory();
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
                console.log("\n \n PRODUCTS LIST: ");
                console.log("---------------------------\n")
                console.log("ID#   ||   Name   ||    Price");
                console.log("--------------------------------\n")
                connection.query("SELECT item_id, product_name, price FROM products", function (err, res) {
                    if (err) throw err;
                    console.log(res);
                    placeOrder();
                    connection.end();
                });
            }
            else {
                console.log("\nThat's okay, maybe next time.\n");
            }
        });

}

function placeOrder() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    type: "confirm",
                    message: "\n \n READY TO PLACE AN ORDER?\n \n",
                    name: "confirm",
                    default: true
                },
                {
                    name: "choice",
                    type: "rawlist",
                    message: "\nSelect the ID# of the product(s) you would like to purchase: ",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].item_id);
                        }
                        return choiceArray;
                    }
                }



            ]).then(function (answer) {
                // get the information of the chosen item
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_id === answer.choice) {
                        chosenItem = results[i];
                        console.log("\n\n YOU HAVE SELECTED THE FOLLOWING: \n")
                        console.log("--------------------------------")
                        console.log(chosenItem);
                        // console.log("YOUR TOTAL IS: ")
                    }
                }
                inquirer
                    .prompt([
                        {
                            name: "quantity",
                            type: "input",
                            message: "How many units would you like?",
                            validate: function (value) {
                                if (value > chosenItem.stock_quantity) {
                                    console.log("Sorry, insufficient quantity, check back later.")
                                } else {
                                    console.log("\n \n-------------------------------", "\n YOUR ORDER SUMMARY: "
                                        + value + " " + chosenItem.product_name + "\n",
                                        "--------------------------------")
                                    connection.query("UPDATE products SET stock_quantity where ?",
                                        [
                                            {
                                                stock_quantity: chosenItem.stock_quantity - value
                                            }
                                        ],
                                        function (error) {
                                            if (error) throw err;
                                        }
                                    )
                                }
                            }
                        },
                            {
                                type: "confirm",
                                message: "\n \n PLACE THIS ORDER?\n \n",
                                name: "confirm",
                                default: true
                            },
                    ]).then(function(inquirerResponse){
                        if(inquirerResponse.confirm){
                            console.log("CONGRATS! YOUR ORDER HAS BEEN PLACED SUCCESSFULLY!");
                            console.log("YOUR TOTAL IS: " + inquirerResponse.price);
                        }
                    })
            }
            )}
            )}


//TODO: PRETTY UP INVENTORY LIST + Product selected list
//TODO: UPDATE DATABASE WITH QUANTITY INFO
//SHOW TOTAL PRICE OF ITEMS

           