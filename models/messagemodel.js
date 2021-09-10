const mongoose=require('mongoose');
const Message=mongoose.model('Message',{
    roomno:{
        type:String
    },
    message:{
        type:String
    } 
})
module.exports=Message;