const express = require("express");
const router = express.Router();
const URL = require("../models/url");
const User = require("../models/user");
const { restrictTo } = require("../middlewares/auth");

router.get("/", async (req,res) => {
    if(!req.user) return res.redirect("/login");
    const allURLs = await URL.find({ createdBy: req.user._id });
    console.log(allURLs)
    return res.render("home", {
        urls: allURLs,
        user: req.user
    });
})

router.get("/admin/url",restrictTo(["ADMIN"]), async (req,res) => {
    if(!req.user) return res.redirect("/login");
    const allURLs = await URL.find({}).populate("createdBy", "name");
    console.log("User: ", req.user);
    return res.render("home", {
        urls: allURLs,
        user: req.user
    });
})

router.get("/signup", async (req,res) => {
    return res.render("signup");
});

router.get("/login", async (req,res) => {
    return res.render("login")
})

module.exports = router;