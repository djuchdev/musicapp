// //jshint esversion:6
require('dotenv').config();
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");



const app = express();

// console.log(process.env.API_KEY);

app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session ({
    secret: "Secret in the App.",
    resave: false, 
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());



mongoose.connect("mongodb://localhost:27017/appNames", {useNewUrlParser: true});
// mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema ({
    name: String,
    email: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);


const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

// passport.serializeUser(function(user, done){
//     done(null, user.id);
// });

// passport.deserializeUser(function(id, done){
//     User.findById(id, function(err, user){
//         done(err, user);
//     });
// });

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res){
    res.render("index");
});

app.get("/signup", function(req, res){
    res.render("signup");
});

app.get("/login", function(req, res){
    res.render("login");
});

app.get("/verified", function(req, res){
    res.render("verified");
});

app.get("/welcome-back", function(req, res){
    res.render("welcome-back");
});

app.get("/user-start", function(req, res){
    if (req.isAuthenticated()){
        res.render("user-start");
    } else {
        res.redirect("/welcome-back");
    }
});

app.post("/signup", function(req, res){

    User.register({username: req.body.username, email: req.body.email}, req.body.password, function (err, user){
        if (err) {
            console.log(err);
            res.redirect("/signup");
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/verified");
            });
        }
    });
    
});

app.post("/login", function(req, res){
   
    const user = new User ({
        email: req.body.email,
        password: req.body.password
    });
     
req.login(user, function(err){
    if (err) {
        console.log(err);
        res.redirect("/login");
    } else {
        passport.authenticate("local")(req, res, function(){
            res.redirect("/user-start");
        });
    }
});

    });


app.listen(3000, function(){
    console.log("Server started on port 3000")
});



