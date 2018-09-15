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
    //createProduct();
    // console.log("connected as id " + connection.threadId);
    //connection.end();
  });

function start(){
    inquirer.prompt([
    {
        type: "list",
        name: "userChoice",
        message: "What would you like to do?",
        choices: ["Post", "Bid"],
      }

    
    
    
]).then(function(user){
    if(user.userChoice === "Post"){
        postItem();
        //console.log("post has been chosen")
    
        
    }else{
        bidItem();
        
    }
  

});
}

function postItem(){
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What would you like to Post?"
        }
    ])
    .then(function(item){
        console.log(`
            ${"Inserted " + item.name + " as new Product\n"}`
            
            )
        var query = connection.query(
            "INSERT INTO auction SET ?",
            {
                name: item.name,
                Starting_Bid: 0,
                Updated_Bid: 0

            },
            function(err, res){
                console.log(`
            ${res.affectedRows + "Production inserted!\n"}
                `);
            }
        );
        console.log(`
            ${query.sql}`)
    })
    
}

function bidItem(){
    connection.query("SELECT * FROM auction", function(err, res){
        if(err)throw err;
        arrItems = [ ];
        res.forEach(element => {
            arrItems.push(element.id.toString());
            
            
        });
        
    })
    inquirer.prompt([
        {
        type: "list",
        name: "name",
        message: "What would you like to bid on?",
        choices: arrItems
        },
        {
        type: "input",
        name: "name",
        message: "What woud you like to bid on this item?"
        
        }
    ])
    .then(function(bid){
        console.log("updated bid Price to " + bid.name + " !\n")
        var query = connection.query(
            "UPDATING auction SET ? WHERE ?",
            [
                {
                    Updated_Bid: bid.name,
                }
            ],
            function(err, res){
                console.log(res.affectedRows + "Bid has been updated")
            }
        )
    })
}


start();