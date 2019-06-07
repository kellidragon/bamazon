var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

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
    console.log("\n\n\n--------------------------------------------------------")
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
                message: "\nVIEW INVENTORY",
                name: "confirm",
                default: true
            }
        ])
        .then(function (inquirerResponse) {
            if (inquirerResponse.confirm) {
                connection.query("SELECT item_id, product_name, price FROM products", function (err, res) {
                    if (err) throw err;

                    console.log("\n \n PRODUCTS LIST: ");
                    console.log("---------------------------\n")

                    var table = new Table({
                        head: ['ID#', 'PRODUCT', 'PRICE']
                        , colWidths: [10, 30, 20]
                    });
                    for (var i = 0; i < res.length; i++) {
                        table.push(
                            [res[i].item_id, res[i].product_name,
                            res[i].price]
                        );

                    }
                    placeOrder();
                    console.log(table.toString());
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
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "\n \n HOW MANY UNITS WOULD YOU LIKE?",
                    validate: function(value){
                        if(isNaN(value)){
                          return false;
                        } else{
                          return true;
                        }
                      }

                } 
            ]).then(function (answer) {

                var chosenItem = (answer.choice) - 1;
                var amount = parseInt(answer.quantity);
                var total = parseFloat(((results[chosenItem].price) * amount).toFixed(2));
                
                // // get the information of the chosen item

                if (results[chosenItem].stock_quantity >= parseInt(amount)) {
                    console.log("-------------------------------------------------------------")
                    console.log("Your total for " + amount + "-" + results[chosenItem].product_name + " is " + "$" + total.toFixed(2) )
                    console.log("-------------------------------------------------------------")
                //     //updates products quantity in mysql
                    connection.query("UPDATE products SET ? WHERE ?", [
                        {
                            stock_quantity: results[chosenItem].stock_quantity - amount
                        },
                        {
                            item_id: results[chosenItem].item_id
                        }
                    ], function (err, result) {
                        inquirer
                        .prompt([
                            {
                                type: "confirm",
                                message: "\n \n CONFIRM ORDER?\n \n",
                                name: "confirmOrder",
                                default: true
                            }
                        ]).then(function(answer){
                        if (err) throw err;
                        console.log("\n\n---------------------------------------------------------------------------")
                        console.log ("SUCCESS! YOUR ODER HAS BEEN PLACED! ORDER WILL SHIP IN 1-2 BUSINESS DAYS.")
                        console.log("---------------------------------------------------------------------------")
                        console.log("\n\n-----------------------------------------")
                        console.log ("           KEEP SHOPPING?")
                        console.log("-----------------------------------------")
                        showInventory();
                       }
            )}
        ) 
        } else {
            console.log("Sorry, there's not enough in stock!")
            console.log ("KEEP SHOPPING?")
            showInventory();
        }
        })

    })
}
