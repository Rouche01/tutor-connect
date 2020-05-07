const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
    topic: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model("Lesson", lessonSchema);