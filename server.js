var express = require('express');
var bodyParser = require('body-parser');
const Order = require('./orders');
const { count } = require('./orders');

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

// the put methode

app.put(BASE_API_PATH +"/orders/_id", async (req, res) => {
	// create mongose method to update a existing record into collection
	let id = req.params._id;
	var data = {
		Name : req.body.Name,
        DNI : req.body.DNI,
        Adress : req.body.Adress,
        email : req.body.email,
       
	}
 
	// save the order
	Order.findByIdAndUpdate(id, data, function(err, order) {
	if (err) throw err;
 
	res.send('Successfully! Order updated - ');
	});
});
// the delete methode
app.delete(BASE_API_PATH +"/orders/_id", async (req, res) => {
    console.log(req.params._id);
	let id = req.params._id;
	Order.remove({
		_id : id
	}, function(err) {
		if (err)
			res.send(err);
		else
			res.send('Successfully! Order has been Deleted.');	
	});
});

 module.exports = app;
 