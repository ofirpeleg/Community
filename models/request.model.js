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

    phone_number: {
        type: String,
    },

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
    },
    notify: {
        type: String,
        default: 'none'
    }
});

const requestModel = model("Request", requestSchema);
module.exports = requestModel;
