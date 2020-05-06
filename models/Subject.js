const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const subjectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Subject", subjectSchema);