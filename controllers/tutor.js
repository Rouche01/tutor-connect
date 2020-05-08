const User = require('../models/User');
const Category = require('../models/Category.js');
const Subject = require('../models/Subject');

exports.getTutors = async (req, res, next) => {
    try {
        const tutorsList = await User.find({role: "tutor"}, '_id role username email name subjects');
        res.status(200).send(tutorsList);
    } catch(err) {
        res.status(500).json({
            status: false,
            message: "Unable to retrieve list of tutors"
        });
    }
}


exports.getTutor = async (req, res, next) => {
    try {
        // check the id if it belongs a tutor
        const tutor = await User.findById({_id: req.params.tutor_id}, '_id role username email name subjects');
        if(!tutor) return res.status(404).json({
            status: false,
            message: "This user does not exist"
        });
        if(tutor.role !== 'tutor') return res.status(404).json({
            status: false,
            message: "This user is not a tutor"
        });
        res.status(200).send(tutor);
    } catch(err) {
        res.status(500).json({
            status: false,
            message: "Unable to retrieve tutor with the id"
        })
    }
}

exports.deleteTutor = async (req, res, next) => {
    try {
        // check if the user exist and is a tutor
        const tutor = await User.findById({_id: req.params.tutor_id});
        if(tutor.role !== 'tutor') return res.status(404).json({
            status: false,
            message: "This user is not a tutor"
        });
        await User.deleteOne({_id: req.params.id});
        res.status(200).json({
            status: false,
            message: "Tutor has been successfully deativated",
            deactivatedTutor: tutor
        });

    } catch(err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}


exports.registerSubject = async(req, res, next) => {
    const {categoryName, subjectTitle} = req.body;
    if(!categoryName || !subjectTitle) return res.status(400).send("categoryName and subjectTitle fields are required");
    try {
        //get reference to the tutor from the username params
        const tutor = req.currentUser;

        // convert categoryName to regexp to make it case insensitive during query
        const categoryNameRegExp = new RegExp("^" + categoryName + "$", "i");

        // populate category's subjects from request body category name - The aim is to find ref to the subject to add
        const category = await Category.findOne({ name: { $regex: categoryNameRegExp } } ).populate("subjects").exec();

        // from the populated subjects find the particular subject using subject title from request body
        const subject = category.subjects.find(subject => 
            subject.title.toLowerCase() === subjectTitle.toLowerCase());
        const { title } = subject;

        // populate tutor subjects
        const populatedTutor =await User.findOne({username: tutor.username}).populate("subjects").exec();

        // Checking for duplicates of the subject in Tutor's subjects before adding it in
        const subjectExist = populatedTutor.subjects.find((sub) => 
            title.toLowerCase() == sub.title.toLowerCase());
        if(subjectExist) return res.status(400).json({
            status: false,
            message: "You have already registered this subject"
        })
        tutor.subjects.push(subject);
        await tutor.save();
        subject.tutors.push(tutor);
        await subject.save();
        res.status(200).json({
            status: true,
            message: "You have registered to take a subject successfully!"
        });
    } catch(err) {
        res.status(500).json({
            status: false,
            message: err
        });
    }
}


exports.getTutorSubjects = async (req, res, next) => {
    const tutor = req.currentUser;
    if(!tutor) return res.status(404).json({
        status: false,
        message: "This tutor does not exist"
    })

    try {
        // populate subject field for tutor
        const populatedTutor = await User.findOne({username: tutor.username}).populate("subjects").exec();
        const subjectList = populatedTutor.subjects;
        res.status(200).send(subjectList);
    } catch(err) {
        res.status(500).json({
            status: false,
            message: "Unable to retrieve the subject lists"
        })
    }
}


exports.updateTutorSubject= async(req, res, next) => {
    const { title, detail } = req.body;
    if(!title && !detail) return res.status(400).json({
        status: false,
        message: "No update was sent, this request require title and detail fields"
    });
    const tutor = req.currentUser;
    if(!tutor) return res.status(404).json({
        status: false,
        message: "This tutor does not exist"
    })
   try {
    const populatedTutor = await User.findOne({username: tutor.username}).populate("subjects").exec();
    const subjectExist = populatedTutor.subjects.find(subject => subject._id == req.params.subject_id);
    if(!subjectExist) return res.status(404).json({
        status: false,
        message: "Tutor does not have such registered subject"
    })
    let newValues = { $set: {  } };
    if (title) { 
        newValues.$set.title = title;
    }
    if (detail) {
        newValues.$set.detail = detail;
    }
    const updatedSubject = await Subject.updateOne({_id: req.params.subject_id}, newValues);
    res.status(200).json({
        status: true,
        message: `${updatedSubject.nModified} subject was modified successfully`
    })
   } catch(err) {
       res.status(500).send(err);
   }
}


exports.deleteTutorSubject = async(req, res, next) => {
    const tutor = req.currentUser;
    if(!tutor) return res.status(404).json({
        status: false,
        message: "This tutor does not exist"
    })
    try {
        const populatedTutor = await User.findOne({username: tutor.username}).populate("subjects").exec();
        const subjectExist = populatedTutor.subjects.find(subject => subject._id == req.params.subject_id);
        if(!subjectExist) return res.status(404).json({
            status: false,
            message: "Tutor does not have such registered subject"
        })
        const deletedSubject = await Subject.deleteOne({_id: req.params.subject_id});
        res.status(200).json({
            status: false,
            message: "Subject has been successfully deleted",
            deletedSubject: subjectExist
        });
    } catch(err) {
        res.status(500).send(err);
    }
    
}