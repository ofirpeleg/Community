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
    /*
    requester_email: {
        type: String,
    },
     */
    date: {
        type: Date,
        required:true,
        default: new Date()
    },
    assignTo: {
        type: String,
        default: 'none'
    },
    status: {
        type: String,
        default: 'pending'
    },
    name: {
        type: String,
    }
});

const requestModel = model("Request", requestSchema);
module.exports = requestModel;
