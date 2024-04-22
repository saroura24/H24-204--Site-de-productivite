const express = require('express');
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.use(express.static("public"));


// Server-side routes
app.get("/", (req,res) => {
  res.render("index");
});
app.get("/accueil", (req,res) => {
  res.render("index", {isPasswordMatch : false});
});

app.get("/connexion", (req,res) => {
  res.render("login", {isPasswordMatch : true, check: true});
});

app.get("/mon-compte", (req,res) => {
  res.render("myAccount2");
});

app.get("/mot-de-passe", (req,res) => {
  res.render("password");
});

app.get("/inscription", (req,res) => {
  res.render("signup");
});

app.get("/parametres", (req,res) => {
  res.render("parametres");
});

app.get("/pomodoro", (req,res) => {
  res.render("pomodoro");
});

app.get("/a-propos", (req,res) => {
  res.render("about");
});

app.get("/bot", (req,res) => {
  res.render("bot");
});

app.post("/connexion", async (req,res) => {
  try {
    const check = await collection.findOne({email: req.body.email});
    if(!check){
      res.render('login', { check: false, isPasswordMatch: null });
      
    } else {
      const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
      if(isPasswordMatch){
        res.render('index', {isPasswordMatch: true})
        
      } else {
        res.render('login', { isPasswordMatch: false, check: true });
        //res.send("Mauvais mot de passe");
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
    res.send("Ce nom d'utilisateur existe déjà");
  } else {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
    const userdata = await collection.insertMany(user);
    console.log(userdata);
    res.redirect("/accueil");
  }
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on Port: ${port}`);
});
