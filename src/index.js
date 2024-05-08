const express = require('express');
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");
const app = express();

//Intégrer système de session


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

app.post("/mon-compte", async (req,res) => {
  const userInfo = {
    age: req.body.age,
    programme: req.body.prgramme,
    momentEtude: req.body.momentEtude,
    genre: req.body.momentEtude,
    matiere: req.body.matiere,
    duree: req.body.duree,

  }

  const existingUser = await collection.findOne({email: user.email})

  const userdata = await collection.insertMany(userInfo);
  console.log(userdata);

  
});


const port = 5000;
app.listen(port, () => {
  console.log(`Server running on Port: ${port}`);
});