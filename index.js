require("dotenv").config();

const express = require("express");

const { connectMongoDB} = require("./connection/url");

const URL = require("./models/url");

const router = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const app = express();
const cookieParser = require("cookie-parser");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");

const path = require("path"); // Why? -> Yeh folder ke saare files resolve krdega!
app.set("view engine", "ejs"); // ejs import app.set
app.set("views", path.resolve("./views")) // saare files folder ke!

app.use(express.json());
app.use(express.urlencoded({extended: false})); // Form Ke liye
app.use(cookieParser());
app.use(checkForAuthentication);

const PORT = 8002;

connectMongoDB(process.env.MONGODB_URL);

app.get("/test", async (req,res) => {
    const allURLs = await URL.find({});
    return res.render("home", {
        urls: allURLs
    }) // home.ejs
})

app.use("/url",restrictTo(["NORMAL","ADMIN"]),router); // yeh middleWare tab hi chalega jab hamari req /url ke uppar jayegi
app.use("/",staticRouter);
app.use("/user",userRoute);

app.get("/short/:shortId", async (req,res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: { timestamp: Date.now()}
        }
    })
    res.redirect(entry.redirectURL);
});


app.listen(PORT, () => {
    console.log("Server Started");
})
