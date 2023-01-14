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
    description: {
        type: String,
        required: true,
    },
    requester_email: {
        type: String,
    },
    date: {
        type: Date,
        required:true,
        default: new Date()
    },
    assignTo: {
        type: String,
        required: true,
        default: 'none'
    },
    status: {
        type: String,
        required: true,
        default: 'pending'
    }
});

const requestModel = model("Request", requestSchema);
module.exports = requestModel;
