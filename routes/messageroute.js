const express=require('express');
const router=express.Router();
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const {check, validationResult}=require('express-validator')
const auth=require('../middleware/auth')
const app=express();
const path = require("path");
const bcryptjs=require('bcryptjs')
const Message=require('../models/messagemodel')
const jwt=require('jsonwebtoken');

router.post('/send/message',auth.verifyUser,  function (req, res) {
    const errors = validationResult(req);
    console.log("requested")
    if (errors.isEmpty()) {
        const roomno = req.body.roomno;
        const message = req.body.message;
            const store = new Message({ roomno: roomno, message: message});
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



router.get("/message",auth.verifyUser, asyncHandler(async (req, res, next) => {
    const message = await Message.find({});
    if(message===null){
        return res.status(200).json({message:"No message found"})
    }
    res.status(201).json({
      message: "success",
      data: message,
    });
  }));

module.exports = router;



