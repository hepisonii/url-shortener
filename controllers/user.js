const User = require("../models/user");
const {v4: uuidv4} = require("uuid");
const express = require("express");
const {setUser} = require("../service/auth");

async function handleUserSignUp(req,res){
    const { name,email,password } = req.body;
    await User.create({
        name,
        email,
        password
    })
    return res.redirect("/login");
}

async function handleUserLogin(req,res){
    const { email, password} = req.body;
    const user = await User.findOne({
        email,
        password
    }
    )
    if(!user) {
        return res.render("login", {
            error: "Invalid Email or Password"
        });
    }
    const token = setUser(user);
    res.cookie("uid", token); // name dedo + sessionId pass krdo
    return res.redirect("/");
}

module.exports = {
    handleUserSignUp,
    handleUserLogin
}