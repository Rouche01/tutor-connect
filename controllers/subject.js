const Subject = require('../models/Subject');
const Category = require('../models/Category');


exports.getSubjects = async (req, res, next) => {
    //check if category exist
    const categoryExist = await Category.findOne({name: req.params.name});
    if(!categoryExist) return res.status(404).json({
        status: false,
        message: "This category does not exist"
    });
    // populate the subjects in the category
    Category.findOne({name: req.params.name}).populate("subjects").exec((err, populatedCategory) => {
        if(err) {
            res.status(400).json({
                status: false,
                message: "unable to retrieve subject list"
            })
        } else {
            const subjectList = populatedCategory.subjects;
            if(subjectList.length < 1) return res.status(400).send("This category has no subjects")
            res.status(200).send(subjectList);
        }
    });
};

exports.getSubject = async (req, res, next) => {
    //check if category exist
    const categoryExist = await Category.findOne({name: req.params.name});
    if(!categoryExist) return res.status(404).json({
        status: false,
        message: "This category does not exist"
    });
    Category.findOne({name: req.params.name}).populate("subjects").exec((err, populatedCategory) => {
        if(err) {
            res.status(400).json({
                status: false,
                message: "unable to retrieve subject list"
            })
        } else {
            const subjectList = populatedCategory.subjects;
            const retrievedSubject = subjectList.find(subject => subject._id == req.params.id);
            if (!retrievedSubject) return res.status(400).json({
                status: false,
                message: "This subject does not exist in this category"
            });
            res.status(200).send(retrievedSubject);
        }
    } );

}

exports.addSubject = async (req, res, next) => {
    // check if category exist
    const subjectCategory = await Category.findOne({name: req.params.name});
    if(!subjectCategory) return res.status(404).json({
        status: false,
        message: "This category does not exist"
    });
    // create the subject
    const { title, detail } = req.body;
    try{
        const newSubject = await Subject.create({
            title,
            detail
        });
        subjectCategory.subjects.push(newSubject);
        try {
            await subjectCategory.save();
            res.status(200).send(newSubject);
        } catch(err) {
            res.status(400).json({
                status: false,
                message: "Unable to add new subject"
            })
        }
        
    } catch(err) {
        res.status(400).json({
            status: false,
            message: err.errors.detail.message
        })
    }
}