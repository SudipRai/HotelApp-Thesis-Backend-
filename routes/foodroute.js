const express=require('express');
const router=express.Router();
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const {check, validationResult}=require('express-validator')
const auth=require('../middleware/auth')
const app=express();
const path = require("path");
const bcryptjs=require('bcryptjs')
const Food=require('../models/foodmodel')
const jwt=require('jsonwebtoken');

router.post('/add/food',auth.verifyUser,  function (req, res) {
    const errors = validationResult(req);
    console.log("requested")
    if (errors.isEmpty()) {
        const roomno = req.body.roomno;
        const foodname = req.body.foodname;
        const number = req.body.number;
        const total = req.body.total;
            const store = new Food({ roomno: roomno, foodname: foodname,number:number,total:total});
            store.save().then(function (result) {
                console.log(result)
                res.status(200).json({ success: true, message: "success",data:result }) 
            }).catch(function (error) {
                res.status(500).json({ err: error })
            })
    }
    else {
        res.status(201).json(errors.array());
    }
})

router.get("/food",auth.verifyUser, asyncHandler(async (req, res, next) => {
    const food = await Food.find({});
    if(food===null){
        return res.status(200).json({message:"No message found"})
    }
    res.status(201).json({
      message: "success",
      data: food,
    });
  }));

module.exports = router;



