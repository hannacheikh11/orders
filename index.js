var express= require('express');
var bodyParser = require('body-parser');
var DataStore = require ('nedb');
var port =3000;
var BASE_API_PATH="/api/V2";
var  DB_FILE_NAME = __dirname + "/orders.json";
console.log("Starting API server...");
var app = express();
app.use(bodyParser.json());

var db = new DataStore({
    filename: DB_FILE_NAME,
    autoload: true
});
app.get("/", (req,res) => {
  
    res.send("<html><body><h>haxnna</h1></body>npm</html>");

   

    });
    app.get(BASE_API_PATH + "/orders",(req,res)=>{
        console.log(Date() +"-GET /orders");

        db.find({},(err,orders) => {
           if (err){
               console.log(Date() + "-"+ err);
               res.sendStatus(500);
           }else{

        
        res.send(orders.map((order) => {
            delete order._id;
            return order;

        }));
    }
    });
});

    app.post(BASE_API_PATH + "/orders",(req,res)=>{
        console.log(Date() +"-POST /orders");

var order=req.body;
db.insert(order,(err) => {
    if(err){
        console.log(Date() + "-" + err);
        res.sendStatus(500);
    }else{
        res.sendStatus(201);
    }
});


    });

        
  app.listen(port);
    console.log("Server ready!")
