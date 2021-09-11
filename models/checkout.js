const mongoose=require('mongoose');
const Checkout=mongoose.model('Checkout',{
    roomno:{
        type:String
    },
    food:{
        type:String
    },
    roomcharge:{
        type:String
    },
    servicecharge:{
        type:String
    },
    total:{
        type:String
    } 
})
module.exports=Checkout;