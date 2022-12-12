const express = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secreteKey=process.env.secreteKey
const userRoutes = express.Router();

userRoutes.post("/signup", async (req, res) => {
    let { name, email, password } = req.body;
    const IPADRESS = req.ip;

    try {
       bcrypt.hash(password, 7,async function(err, hash) {
           // Store hash in your password DB.
           if (err) {
               res.send("Something went Wrong")
           } else {
               await UserModel.create({ name, email, password: hash, IPADRESS });
               res.send({ msg: "User Successully Registered" });
           }
           
});
                 
    } catch (err) {
        res.send({ msg: "Something Went wrong" });
    }
})


userRoutes.post("/login", async (req, res) => {
    const { email, password } = req.body;


    try {
        let user = await UserModel.findOne({ email }); 

        if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                
                 const token = jwt.sign({user_id:user._id}, secreteKey);
                if (err) {
                    res.send({ msg: "Login failed" });
                }
                
                if (result) {
                   
                    res.send({ msg: "Login Sucess", token: token });
                } else {
                    res.send({ msg: "Login failed" });
                }
        });
        }
        
  } catch (err) {
      res.send({ msg: "Login failed" });
  }
});

module.exports = { userRoutes };