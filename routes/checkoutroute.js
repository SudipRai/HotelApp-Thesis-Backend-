const express=require('express');
const router=express.Router();
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const {check, validationResult}=require('express-validator')
const auth=require('../middleware/auth')
const app=express();
const path = require("path");
const bcryptjs=require('bcryptjs')
const Checkout=require('../models/checkout')
const jwt=require('jsonwebtoken');

router.post('/checkout',auth.verifyUser,  function (req, res) {
    const errors = validationResult(req);
    console.log("requested")
    if (errors.isEmpty()) {
        const roomno = req.body.roomno;
        const food = req.body.food;
        const roomcharge = req.body.roomcharge;
        const servicecharge = req.body.servicecharge;
        const total = req.body.total;
            const store = new Checkout({ roomno: roomno, food: food,roomcharge:roomcharge,servicecharge:servicecharge, total:total});
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

router.get("/checkout",auth.verifyUser, asyncHandler(async (req, res, next) => {
    const checkout = await Checkout.find({});
    if(checkout===null){
        return res.status(200).json({message:"No message found"})
    }
    res.status(201).json({
      message: "success",
      data: checkout,
    });
  }));




module.exports = router;



