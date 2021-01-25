var express = require('express');
var bodyParser = require('body-parser');
//const Order = require('./orders');
const db = require('./db.js');
const { count } = require('./orders');
const { Mongoose } = require('mongoose');
const ProductResource = require('./productResource');
const order = require('./orders');

var BASE_API_PATH = "/api/v1";

var app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("<html><body><h1>My server</h1></body></html>");
});

app.get(BASE_API_PATH + "/orders", (req, res) => {
    console.log(Date() + " - GET /orders");

    order.find({}, (err, orders) => {
        if (err) {
            console.log(Date() + "-" + err);
            res.sendStatus(500);
        } else {
            res.send(orders.map((or) => {
                return or.cleanup();
            }));
        }
    });

});


//get de todos los producto para crear el order
app.get(BASE_API_PATH  + "/products",(req,res)=>
{
    console.log("GET/products");
    ProductResource.getAllProducts().then((body)=>{
        res.send(body);

    })
})
// the post methode
//app.post(BASE_API_PATH + "/orders", (req, res) => {
    //console.log(Date() + " - POST /orders");
    //var order = req.body;
    //Order.create(order, (err) => {
        //if (err) {
           // console.log(Date() + " - " + err);
            //res.sendStatus(500);
       // } else {
          //7  res.sendStatus(201);
      //  }
   //// });
//});


//app.post(BASE_API_PATH + "/orders", (req, res) => {
//    console.log(Date() + " - POST /orders");
 //  var order=req.body;
       
          //_id=req.body._id ,
          
          //Name=req.body.Name ,
         // DNI=req.body.DNI ,
          //Adress =req.body.Adress ,
          //email=req.body.email ,
          //total=req.body.total,
         // created=req.body.created,
          //status=req.body.status,
        // cartItems=req.body.cartItems;
       // new_order = new Order(order.order)
       
      // new_order.save((err, order) => {
       // if (err) {
         // console.log(Date() + " - " + err);
          //  res.sendStatus(500);
       //} else {
        //   res.sendStatus(201);
      // }
   // });
//});



app.post(BASE_API_PATH + "/orders", (req, res) => {
    console.log(Date() + "- POST /orders");
    var or = req.body;
    order.create(or, (err) => {
        if (err) {
            console.log(Date() + " - " + err);
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    });
});
// the put methode

//app.put(BASE_API_PATH +"/orders/_id", async (req, res) => {
	// create mongose method to update a existing record into collection
//	let id = req.params._id;
	//var data = {
	//	Name : req.body.Name,
      //  DNI : req.body.DNI,
      //  Adress : req.body.Adress,
       // email : req.body.email,
       
	//}
 
	// save the order
	//Order.findByIdAndUpdate(id, data, function(err, order) {
	//if (err) throw err;
 
	//res.send('Successfully! Order updated - ');
    //});
    

   /* app.put(BASE_API_PATH + "/orders/:_id",(req,res)=>{
        console.log(Date() + " - PUT /orders/" + req.params._id);
        Order.findOne({_id: req.params._id}, (err, order)=>{
            if(err){
                console.log(Date()+ " - "+err);
                res.sendStatus(500);
            }else if(!order){
                console.log(Date()+" - PUT /orders/"+req.params._id + " Error: order not exist");
                res.sendStatus(404);
            }else{
                order.Name= req.body.Name;
                order.DNI= req.body.DNI;
                order.email= req.body.email;
                order.Adress= req.body.Adress;
                order.status= req.body.status;
                    
    
                order.save((err, order) =>{
                    if(err){

                        console.log(Date()+ " - "+err);
                        res.status(500);
                    }else{


                        console.log(Date()+" - PUT /orders/"+req.params._id + " Successfully! Order updated - ");
                        res.status(200);
                        return res.send(order.cleanup());
                    }
                })
            }
            
        })
    });*/




    //Actualizar el email del pedido

  

// the delete methode
//app.delete(BASE_API_PATH +"/orders/:_id",  (req, res) => {
   // console.log(Date() + " - Delete /orders/"+req.params._id);
    
    //Order.findOneAndRemove({_id: req.params._id}, (err, order)=>{
      //  if(err){
          //  console.log(Date() + " - " + err);
           // res.sendStatus(500);
        //}else{
           // res.sendStatus(204);
       // }
    //})
//});

app.delete(BASE_API_PATH + "/orders" + '/:cod', (req, res) => {
    console.log(Date() + "- DELETE /orders/cod");
    var cod = req.params.cod;
    console.log(cod);
    order
    .deleteOne({cod: cod}, (err) => {
        if (err) {
            console.log(Date() + " - " + err);
            res,sendStatus(500);
        } else {
            res.sendStatus(204);
            console.log("Se elimino el order con Cod:  " + cod);
        }
    });
});

// eliminar todo orders

app.delete(BASE_API_PATH + "/orders",
    
    (req, res) => {
    console.log(Date() + "- DELETE /orders");
    order.deleteMany({}, {multi: true}, (err) => {
        if (err) {
            console.log(Date() + " - " + err);
            res.sendStatus(500);
        } else {
            res.sendStatus(204);
        }
    });

    app.put(BASE_API_PATH + "/orders" + '/:cod',
    
    (req, res) => {
    console.log(Date() + "- DELETE /orders/cod");
    order.updateOne({cod: req.params.cod}, {$set:{cod: req.body.cod, 
        name: req.body.name,
        DNI: req.body.DNI, 
        address: req.body.address, 
        email: req.body.email,
        total: req.body.total,
        }},  (err)  => {
        if (err) {
            console.log(Date() + " - " + err);
            res.sendStatus(500);
        } else {
            res.status(200).send('Updated order');
        }
      });
});


});
 module.exports = app;
 