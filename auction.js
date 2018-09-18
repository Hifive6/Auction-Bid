var inquirer = require("inquirer");
var mysql = require("mysql");
var arrItems
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
        choices: ["Post", "Bid", "Exit"],
      }

    
    
    
]).then(function(user){
    if(user.userChoice === "Post"){
        postItem();
        //console.log("post has been chosen")
    
        
    }else if(user.userChoice === "Bid"){
        bidItem();
        
    }else{
        connection.end();
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
        arrItems = []
        // console.log(res)
        // for (i = 0; i < res.length; i++){
        res.forEach(function (element) {
            
            arrItems.push(element.name.toString() );
            //console.log(arrItems)
            
        });
        inquirer.prompt([
        {
        type: 'list',
        name: 'item',
        message: 'What would you like to bid on?',
        choices: arrItems,
        },
        {
        type: "input",
        name: "name",
        message: "What will you bid on this item?",
        }
    ])
    .then(function(bid){
        console.log("updated bid Price to " + bid.name + " !\n")
        var item = bid.item
        console.log(item)
        connection.query("SELECT * FROM name WHERE ?")
            [
                {
                    id: item
                }
            ]
        
        var query = connection.query(
            "UPDATE auction SET ? WHERE ?",
            [
                {
                    Updated_Bid: bid.name,
                }
            ],
            function(err, res){
                console.log(res.affectedRows + "Bid has been updated")
            }
        )
        console.log(query.sql)
    })
})

    }
    

start();