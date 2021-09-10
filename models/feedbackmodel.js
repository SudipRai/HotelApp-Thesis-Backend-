const mongoose=require('mongoose');
const Feedback=mongoose.model('Feedback',{
    roomno:{
        type:String
    },
    feedback:{
        type:String
    } 
})
module.exports=Feedback;