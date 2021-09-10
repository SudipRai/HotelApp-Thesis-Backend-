const mongoose=require('mongoose');
const Service=mongoose.model('Service',{
    roomno:{
        type:String
    },
    name:{
        type:String
    } 
})
module.exports=Service;