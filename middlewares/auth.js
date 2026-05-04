const {getUser} = require("../service/auth");
const express = require("express");
const router = express.Router();

function checkForAuthentication(req,res,next){
    const userId = req.cookies?.uid;
    if(!userId) return next();
    const user = getUser(userId);
    if(!user) return next();
    req.user = user;
    return next();
}

function restrictTo(roles = []){
    console.log("ROLE: ",roles);
    return function(req,res,next){
    console.log("User role: ",req.user.role);
        if(!req.user) return res.redirect("/login");
        if(!roles.includes(req.user.role)) return res.end("Unauthorized");
        return next();
    }
}

module.exports = {
    checkForAuthentication,
    restrictTo
}