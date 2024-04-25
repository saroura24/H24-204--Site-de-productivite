const mongoose = require("mongoose");
const connect= mongoose.connect("mongodb+srv://yannyvan2005:dervalvh3@cluster0.xfb4i2x.mongodb.net/Studialy");

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

