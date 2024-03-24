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
      required: true
  },
  password: {
    type: String,
    required: true
  }
});

const collection = new mongoose.model("users", LoginSchema);

module.exports = collection;

