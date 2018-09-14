var inquirer = require("inquirer");
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,  
    user: "root",
    insecureAuth: true,
    password: "MS@Dc02830786",
    database: "auction_bidDB"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
    connection.end();
  });
inquirer.prompt([
   
    {
        type: "list",
        name: "userChoice",
        message: "What would you like to do?",
        choices: ["Post", "Bid"],
      }
   
]).then(function(user){
    if(user.userChoice === "Post"){
        console.log("Post was chosen!");
    }else{
        console.log("Bid was chosen!")
    }
})

  