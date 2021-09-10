const mongoose=require('mongoose');
const Food=mongoose.model('Food',{
    roomno:{
        type:String
    },
    foodname:{
        type:String
    },
    number:{
        type:String
    },
    total:{
        type:String
    } 
})
module.exports=Food;