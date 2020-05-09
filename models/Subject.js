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
    },
    tutors: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

module.exports = mongoose.model("Subject", subjectSchema);