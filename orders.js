const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
   
  cod: {type: String}, 
        name: String,
        
        DNI:String,
        address:String,
        email:String,
        total: Number,

        status: { 

            type: String, 
            
            enum : ['DELIVERED', 'DELIVERYING'], 
            
            default: 'DELIVERED' 
            
            }, 
        
            created: { 
                type: Date,
                default: Date.now
            },
            

cartItems: [
    {
        
        title: String, 
        price: Number,
        count: Number 
       
    }
]



},{
    timestamps:true
}
);

orderSchema.methods.cleanup = function() {
    return {cod: this.cod,name:this.name, DNI:this.DNI,email:this.email,total:this.total,status:this.status
        
        , created: this.created,cartItems:this.cartItems};
}

const order = mongoose.model('order', orderSchema);


module.exports = order;