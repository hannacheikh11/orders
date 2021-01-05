var express = require('express');
var bodyParser = require('body-parser');
const Order = require('./orders');

var BASE_API_PATH = "/api/v2";

var app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("<html><body><h1>My server</h1></body></html>");
});

app.get(BASE_API_PATH + "/orders", (req, res) => {
    console.log(Date() + " - GET /orders");

    Order.find({}, (err, orders) => {
        if (err) {
            console.log(Date() + "-" + err);
            res.sendStatus(500);
        } else {
            res.send(orders.map((order) => {
                return order.cleanup();
            }));
        }
    });

});
// the post methode
app.post(BASE_API_PATH + "/orders", (req, res) => {
    console.log(Date() + " - POST /orders");
    var order = req.body;
    Order.create(order, (err) => {
        if (err) {
            console.log(Date() + " - " + err);
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    });
});
// the delete methode
 module.exports = app;
 