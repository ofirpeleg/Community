const { model, Schema } = require("mongoose");

const requestSchema = new Schema({
    requester_id: {
        type: String,
        required: true,
    },
    request_type: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
        required: true,
    },
    requester_email: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required:true,
        default: new Date()
    }
});

const requestModel = model("Request", requestSchema);
module.exports = requestModel;
