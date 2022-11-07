require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose')
const encrypt = require('mongoose-encryption')

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));


mongoose.connect("mongodb://localhost:27017/appNames", {useNewUrlParser: true});

const userSchema = new mongoose.Schema ({
    name: String,
    email: String,
    password: String
});

userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ["password"] });

const User = new mongoose.model("User", userSchema);



app.get("/", function(req, res){
    res.render('index');
});

app.get("/login", function(req, res){
    res.render('login');
});

app.get("/signup", function(req, res){
    res.render('signup');
});

app.get("/verified", function(req, res){
    res.render('verified');
});

app.get("/welcome-back", function(req, res){
    res.render('welcome-back');
});

app.get("/user-start", function(req, res){
    res.render('user-start');
});

app.post("/signup", function(req, res){
    const newUser = new User({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    newUser.save(function(err){
        if (err) {
            console.log(err);
        } else {
            res.render('verified');
        }
    })
});

app.post('/login', function (req, res){
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email}, function(err, foundUser){
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
                if (foundUser.password === password) {
                    res.render('user-start');
                }
            }
        }
    })
})



app.listen(3000, function(){
    console.log("Server Started on Port 3000.")
});