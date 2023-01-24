const { model, Schema } = require("mongoose");

const userSchema = new Schema({

    phone_number: {
        type: String,
        required: true,
    },
    skills: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    full_name: {
        type: String,
        required: true,
    },
});

const userModel = model("User", userSchema);
module.exports = userModel;
