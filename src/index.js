const express = require('express');
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://yannyvan2005:dervalvh3@cluster0.xfb4i2x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.use(express.static("public"));

const session = require('express-session');

require('dotenv').config();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

app.get("/", (req,res) => {
  res.render("index");
});

app.get("/accueil", (req,res) => {
if(req.session.isAuthenticated && req.session.user){
  
  res.render("index", {isPasswordMatch : true, name: req.session.user.name});
}else{
  res.render("index", {isPasswordMatch : false});
}
  
});

app.get("/connexion", (req,res) => {
  res.render("login", {isPasswordMatch : true, check: true});
});

app.get("/mon-compte", (req,res) => {
  res.render("myAccount2");
});



app.get("/inscription", (req,res) => {

  res.render("signup", {existingUser: false});
});

app.get("/parametres", (req, res) => {
 

  if(req.session.isAuthenticated){
    
    res.render("parametres", {isPasswordMatch : true});
  }else{
    
    res.render("parametres", {isPasswordMatch : false});
  }
 
});

app.get("/pomodoro", (req,res) => {
  if(req.session.isAuthenticated){
    res.render("pomodoro", {isPasswordMatch : true});
  }else{
    res.render("pomodoro", {isPasswordMatch : false});
  }
});

app.get("/a-propos", (req,res) => {
  if(req.session.isAuthenticated){
    res.render("about", {isPasswordMatch : true});
  }else{
    res.render("about", {isPasswordMatch : false});
  }
});

app.get("/bot", (req,res) => {
  res.render("bot");
});

app.get("/deconnexion", (req,res) => {
  req.session.isAuthenticated=false;
  res.redirect('/accueil');
});



app.post("/connexion", async (req,res) => {
  try {
    const check = await collection.findOne({email: req.body.email});
    if(!check){
      res.render('login', { check: false, isPasswordMatch: null });
      
    } else {
      const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
      if(isPasswordMatch){
        
        req.session.user = {
          name: check.name,
          email: check.email
      };

        req.session.isAuthenticated = true;
        res.redirect('/accueil'); 
    
      } else {
        res.render('login', { isPasswordMatch: false, check: true });
      }
    }
  } catch {
    res.send("Erreur");
  }
});

app.post("/inscription", async (req,res) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }

  const existingUser = await collection.findOne({email: user.email})

  if(existingUser){
    res.render("signup", {existingUser: true});
    
  } else {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
    const userdata = await collection.insertMany(user);
    console.log(userdata);
    req.session.user = {
      name: user.name,
      email: user.email
  };
  req.session.isAuthenticated = true;
    res.render("index", {isPasswordMatch : true, name: req.session.user.name});
   
  }
});


app.post("/mon-compte", async (req, res) => {
  try {
    if (req.session.isAuthenticated) {
      const userInfo = {
        age: req.body.age,
        programme: req.body.programme,
        momentEtude: req.body.momentEtude,
        genre: req.body.genre,
        matiere: req.body.matiere,
        duree: req.body.duree,
      };

      await client.connect();
      // Get the reference to the database
      const db = client.db("Studialy");

      // Get the reference to the users collection
      const usersCollection = db.collection("users");

      // Update the user information in the users collection
      await usersCollection.update(
        { name: "Yann" }, 
        {$set:{age: userInfo.age}} 
      );

      res.render("myAccount2", { successMessage: "User information updated successfully" });
    } else {
      res.redirect("/connexion"); // Redirect to login if user is not authenticated
    }
  } catch (error) {
    console.error("Error updating user information:", error);
    res.status(500).send("An error occurred while updating user information");
  }
});





const port = 5000;
app.listen(port, () => {
  console.log(`Server running on Port: ${port}`);
});