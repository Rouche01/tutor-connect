const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const categorySchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    subjects: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Subject'
        }
    ]
});

categorySchema.pre('remove', function(next) {
    const Subject = require('../models/Subject');
    Subject.remove({ _id: { $in: this.subjects } }).then(() => next());
});

module.exports = mongoose.model("Category", categorySchema);