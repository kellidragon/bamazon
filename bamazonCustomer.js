var mysql = require("mysql");
var inquire = require("inquirer");

//connect to the database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Metropcs1",
    database: "bamazonDB"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Welcome to Bamazon, the world's larget online store!")
    // console.log("connected as id " + connection.threadId + "\n");
  });
// inquirer
// prompt{

// }