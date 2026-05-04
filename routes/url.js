const express = require("express");

const router = express.Router();

const {
    handleCreateShortUrl
} = require("../controllers/url");


router.post("/", handleCreateShortUrl);

module.exports = router;