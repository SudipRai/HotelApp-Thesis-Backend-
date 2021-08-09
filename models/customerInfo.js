const mongoose=require('mongoose');
const Customer=mongoose.model('Customer',{
    fullname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
       minlegth:8
    },
    roomno:{
        type:String,
        required:true,
        unique:true
    }
  
})
module.exports=Customer;