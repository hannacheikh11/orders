var express= require('express');
var bodyParser = require('body-parser');
var port =3000;
var BASE_API_PATH="/api/V2";
var orders=[
    {"id":"1234" , "date":"20/12/2020"}
];
console.log("Starting API server...");
var app = express();
app.use(bodyParser.json());
app.get("/", (req,res) => {
  
    res.send("<html><body><h>haxnna</h1></body></html>");

   

    });
    app.get(BASE_API_PATH + "/orders",(req,res)=>{
        console.log(Date() +"-GET /orders");
        res.send(orders);
    });

    app.post(BASE_API_PATH + "/orders",(req,res)=>{
        console.log(Date() +"-POST /orders");

var order=req.body;
orders.push(order);
res.sendStatus(201);
    });

        
  app.listen(port);
    console.log("Server ready!")
