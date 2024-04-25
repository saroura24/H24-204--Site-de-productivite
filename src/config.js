const mongoose = require("mongoose");
const connect= mongoose.connect("mongodb+srv://yannyvan2005:dervalvh3@cluster0.xfb4i2x.mongodb.net/Studialy");
const jwt = require("jsonwebtoken")
const SECRET_ACCESS_TOKEN = require('../src/index')





connect.then(()=>{

console.log("Its connected");

})
.catch(()=>{

console.log("Database couldnt be connected");


});




const LoginSchema = new mongoose.Schema({
  name: {
      type: String,
      
  },
  password: {
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true

  }
  
});


LoginSchema.methods.generateAccessJWT = function () {
  let payload = {
    id: this._id,
  };
  return jwt.sign(payload, SECRET_ACCESS_TOKEN, {
    expiresIn: '24h',
  });
};


const InfoSchema = new mongoose.Schema({
  firstName: {
      type: String,
      
  },
  lastName: {
    type: String,
    required: true
  },
  gender:{
    type: String,
    required: true

  },
  birth:{
    type: String,
    required: true

  }
});

const collection = new mongoose.model("users", LoginSchema);

module.exports = collection;




