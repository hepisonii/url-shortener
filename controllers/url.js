const URL = require("../models/url");

const shortid = require("shortid");


async function handleCreateShortUrl(req,res){
    const body = req.body;
    if(!body.url){
        res.status(400).json({ msg: "URL is required"});
    }
    if(!body.url.startsWith("https")){
        body.url = "https://" + body.url;
    }
    const test = await URL.findOne({redirectURL: body.url});
    console.log("test: ", test);
    if(test){
        return res.render("home", {
            id: test.shortId,
            user: req.user
        });
    }
    const shortId = shortid();
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id
    });
    return res.render("home", {
        id: shortId,
        user: req.user,
    });
}

module.exports = {
    handleCreateShortUrl
}