const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectURL: {
        type: String,
        required: true,
        unique: true
    },
    visitHistory: [{
        timestamp: { type: Number }
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, // Bhai yeh ek ObjectId banayega random
        ref: "user" // apna jo user vala schema hai usko apne me lelega! validation ke liye
    }
}, { timestamps: true });

const URL = mongoose.model("url", urlSchema);

module.exports = URL;