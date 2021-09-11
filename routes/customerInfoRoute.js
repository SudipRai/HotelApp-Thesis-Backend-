const express=require('express');
const router=express.Router();
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const {check, validationResult}=require('express-validator')
const auth=require('../middleware/auth')
const app=express();
const path = require("path");
const bcryptjs=require('bcryptjs')
const Customer=require('../models/customerInfo')
const jwt=require('jsonwebtoken');


//-----Register the customer-------//
router.post("/register",auth.verifyUser,[
    check('fullname',"Username is required").not().isEmpty(),
    check('password',"Password is required").not().isEmpty(),
    check('roomno',"Room No is required").not().isEmpty()   
    ], (req, res) => { 
    const errors=validationResult(req);
    if(errors.isEmpty()){
        const fullname=req.body.fullname
        const roomno=req.body.roomno
        const password=req.body.password
        bcryptjs.hash(password,10,function(err,hash){
            const myData = new Customer({
                fullname:fullname,
                roomno:roomno,
                password:hash
            });
            myData.save().then(function(result){
                res.status(201).json({
                   message:"success",
                   data : result
                });
        }).catch(function(err){
            res.status(500).json({message:"err"}) 
        })
    })
}       
    else{
        res.status(400).json({message:"Invalid email format"});
    }
});
//-------------------------------------------------------------//


//--------------------Customer Login---------------------------//
router.post('/userLogin',function(req,res){
    const roomno=req.body.roomno
    const password=req.body.password
    Customer.findOne({roomno:roomno})
    .then(function(data){
        if(data===null){
            return res.status(201).json({message:"Invalid Credentials"})
        }
        bcryptjs.compare(password,data.password,function(err,result){
            if(result===false){
                return res.status(201).json({message:"Invalid credentials"})
            }
            const token=jwt.sign({userid:data._id},'anysecretkey')
            return res.status(200).json({message:"success",token:token,data:data._id,roomno:data.roomno,name:data.fullname})
        })
    })
    .catch(function(e){
        res.status(500).json({message:e})
    })
})


module.exports=router;