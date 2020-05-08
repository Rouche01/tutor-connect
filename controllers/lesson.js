const Lesson = require('../models/Lesson');
const User = require('../models/User');


// utility function to check if request body is empty
const isEmpty = (obj) => {
    for(let key in obj) {
        if(obj.hasOwnProperty(key)) return false;
    }
    return true;
}


exports.bookLesson = async (req, res, next) => {
    // check if user exist
    const student = req.currentUser;
    if(!student) return res.status(404).json({
        status: false,
        message: "This user does not exist"
    });
    // create the lesson
    const { topic, duration, subject } = req.body;
    try{
        const newLesson = await Lesson.create({
            topic,
            duration,
            subject
        });
        student.lessons.push(newLesson);
        try {
            await student.save();
            res.status(200).send(newLesson);
        } catch(err) {
            res.status(500).json({
                status: false,
                message: "Unable to book new lesson"
            })
        }
        
    } catch(err) {
        res.status(400).json({
            status: false,
            message: err.errors
        })
    }
}



exports.getLessons = async (req, res, next) => {
    try {
        const lessonsList = await Lesson.find();
        res.status(200).send(lessonsList);
    } catch(err) {
        res.status(500).json({
            status: false,
            message: "Unable to retrieve lists of lesson from the database"
        });
    }
}

exports.updateLesson = async (req, res, next) => {
    // check for any update data in the request body
    const lessonUpdate = req.body;
     if(isEmpty(lessonUpdate)) return res.status(400).json({
        status: false,
        message: "No update was sent"
    });

    const lessonExist = await Lesson.findById({_id: req.params.lesson_id});
    if(!lessonExist) return res.status(404).json({
        status: false,
        message: "This lesson does not exist"
    });

    let newValues = { $set: {} };
    if(lessonUpdate.topic) {
        newValues.$set.topic = lessonUpdate.topic;
    }
    if(lessonUpdate.duration) {
        newValues.$set.duration = lessonUpdate.duration;
    }
    if(lessonUpdate.subject) {
        newValues.$set.subject = lessonUpdate.subject;
    }

    try {
        const updatedLesson = await Lesson.updateOne({_id: req.params.lesson_id}, newValues);
        res.status(200).json({
            status: true,
            message: `${updatedLesson.nModified} subject was modified successfully`
        })
    } catch(err) {
        res.status(500).send(err);
    }

}

exports.deleteLesson = async(req, res, next) => {
    try {
        const lessonExist = await Lesson.findOne({_id: req.params.lesson_id});
        if(!lessonExist) return res.status(404).json({
            status: false,
            message: "This category does not exist"
        });
        await Lesson.deleteOne({_id: req.params.lesson_id});
        res.status(200).json({
            status: false,
            message: "Subject has been successfully deleted",
            deletedSubject: lessonExist
        });
    } catch(err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
};

exports.getLesson = async (req, res, next) => {
    // check if the subject with the id exists
    try {
        const lessonExist = await Lesson.findById({_id: req.params.lesson_id});
        if(!lessonExist) return res.status(404).json({
            status: false,
            message: "This lesson does not exist"
        });
        res.status(200).send(lessonExist);
    }catch(err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}