const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    _id:String,

    
        Name: String,
        
        DNI:String,
        Adress:String,
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
        _id: String,
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
    return {_id: this._id,Name:this.Name,DNI:this.DNI,lastName:this.lastName,email:this.email,total:this.total,status:this.status
        
        , created: this.created,cartItems:this.cartItems};
}

const order = mongoose.model('order', orderSchema);


module.exports = order;