const mongoose=require('mongoose');
    const conn = mongoose.connect('mongodb://127.0.0.1:27017/dbHotelAid', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      });
      console.log("connected");