const express = require('express');
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");
const app = express();
const UserModel = require("./config"); // Import your Mongoose User model

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.use(express.static("public"));

const session = require('express-session');
const { log } = require('console');

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

app.get("/mon-compte", async (req,res) => {

  const user = await UserModel.findOne({ name: req.session.user.name });

  req.session.user = {
    name : req.session.user.name,
    age : user.get("age"),
    programme : user.get("programme"),
    tache : user.get("tache"),
    genre :user.get("genre"),
    matiere : user.get("matiere"),
    duree : user.get("duree")
  };



  
res.render("myAccount2",{ age: req.session.user.age, programme: req.session.user.programme, tache: req.session.user.tache, genre: req.session.user.genre, matiere: req.session.user.matiere, duree: req.session.user.duree});


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



app.post("/connexion", async (req, res) => {
  try {
    const user = await collection.findOne({ email: req.body.email });
    if (!user) {
      console.log("User not found:", req.body.email);
      res.render('login', { check: false, isPasswordMatch: null });
    } else {
      console.log("User found:", user);
      const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
      console.log("Password match:", isPasswordMatch);
      if (isPasswordMatch) {
        req.session.user = { name: user.name, email: user.email };
        req.session.isAuthenticated = true;
        res.redirect('/accueil');
      } else {
        console.log("Password does not match for user:", user.email);
        res.render('login', { isPasswordMatch: false, check: true });
      }
    }
  } catch (error) {
    console.error("Error during login:", error);
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
        tache: req.body.tache,
        genre: req.body.genre,
        matiere: req.body.matiere,
        duree: req.body.duree
      };

      // Find the user by name
      const user = await UserModel.findOne({ name: req.session.user.name });

      if (!user) {
        return res.status(404).send("User not found");
      }

      // Update user information
      user.age = userInfo.age;
      user.programme = userInfo.programme;
      user.tache = userInfo.tache;
      user.genre = userInfo.genre;
      user.matiere = userInfo.matiere;
      user.duree = userInfo.duree;

      req.session.user = {
      name : req.session.user.name,
      age : userInfo.age,
      programme : userInfo.programme,
      tache : userInfo.tache,
      genre :userInfo.genre,
      matiere : userInfo.matiere,
      duree : userInfo.duree
    };

    console.log(req.session.user);

    
      await user.save();
      req.session.isAuthenticated = true;

      res.render("myAccount2", { successMessage: "User information updated successfully", age: req.session.user.age, programme: req.session.user.programme, tache: req.session.user.tache, genre: req.session.user.genre, matiere: req.session.user.matiere, duree: req.session.user.duree});
    } else {
      res.redirect("/connexion"); 
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