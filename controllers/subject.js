const Subject = require('../models/Subject');
const Category = require('../models/Category');


const findSubject = async(paramName, paramId) => {
    const paramsNameRegExp = new RegExp("^" + paramName + "$", "i");
    try {
        const populatedCategory = await Category.findOne({name: { $regex: paramsNameRegExp } }).populate("subjects").exec();
        const subjectList = populatedCategory.subjects;
        return subjectList.find(subject => subject._id == paramId);
    } catch(err) {
        res.status(400).json({
            status: false,
            message: "unable to retrieve subject list"
        });
    }
};


exports.getSubjects = async (req, res, next) => {
    const paramsNameRegExp = new RegExp("^" + req.params.name + "$", "i");

    //check if category exist
    const categoryExist = await Category.findOne( {name: { $regex: paramsNameRegExp } } );
    if(!categoryExist) return res.status(404).json({
        status: false,
        message: "This category does not exist"
    });
    // populate the subjects in the category
    Category.findOne({name: { $regex: paramsNameRegExp } }).populate("subjects").exec((err, populatedCategory) => {
        if(err) {
            res.status(500).json({
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
    const paramsNameRegExp = new RegExp("^" + req.params.name + "$", "i");
    //check if category exist
    const categoryExist = await Category.findOne({name: { $regex: paramsNameRegExp } });
    if(!categoryExist) return res.status(404).json({
        status: false,
        message: "This category does not exist"
    });
    const retrievedSubject = await findSubject(req.params.name, req.params.id);
    if (!retrievedSubject) return res.status(400).json({
        status: false,
        message: "This subject does not exist in this category"
    });
    res.status(200).send(retrievedSubject);

}

exports.addSubject = async (req, res, next) => {
    const paramsNameRegExp = new RegExp("^" + req.params.name + "$", "i");
    // check if category exist
    const subjectCategory = await Category.findOne({name: { $regex: paramsNameRegExp } });
    if(!subjectCategory) return res.status(404).json({
        status: false,
        message: "This category does not exist"
    });

    // Populate the subjects in the category & check for duplicates
    const { title, detail } = req.body;
    if(!title && !detail) return res.status(400).send("Title and detail are required");
    const populatedCategory = await Category.findOne({name: req.params.name}).populate("subjects").exec();
    const duplicateCheck = populatedCategory.subjects.find(subject => 
        subject.title.toLowerCase() == title.toLowerCase());
    if(duplicateCheck) return res.status(400).json({
        status: false,
        message: "A subject with this title already exist, change the title and try again"
    });
    // create the subject
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
            message: err.errors
        })
    }
}

exports.updateSubject = async (req, res, next) => {
    const paramsNameRegExp = new RegExp("^" + req.params.name + "$", "i");
    // check for any update data in the request body
    const subjectUpdate = req.body;
     if(!subjectUpdate.title && !subjectUpdate.detail) return res.status(400).json({
        status: false,
        message: "No update was sent"
    });

     //check if category exist
     const categoryExist = await Category.findOne({name: { $regex: paramsNameRegExp } });
     if(!categoryExist) return res.status(404).json({
         status: false,
         message: "This category does not exist"
     });
     
    const retrievedSubject = await findSubject(req.params.name, req.params.id);
    if (!retrievedSubject) return res.status(400).json({
        status: false,
        message: "This subject does not exist in this category"
    });
    let newValues = { $set: {  } };
    if (subjectUpdate.title) { 
        newValues.$set.title = subjectUpdate.title;
    }
    if (subjectUpdate.detail) {
        newValues.$set.detail = subjectUpdate.detail;
    }

    try{
        const updatedSubject = await Subject.updateOne({_id: req.params.id}, newValues);
        res.status(200).json({
            status: true,
            message: `${updatedSubject.nModified} subject was modified successfully`
        })
    } catch(err) {
        res.status(500).send(err);
    }
    

}


exports.deleteSubject = async (req, res, next) => {
    const paramsNameRegExp = new RegExp("^" + req.params.name + "$", "i");
    //check if category exist
    try {
        const categoryExist = await Category.findOne({name: { $regex: paramsNameRegExp } });
        if(!categoryExist) return res.status(404).json({
            status: false,
            message: "This category does not exist"
        });

        // check if the subject exists in the category
        const retrievedSubject = await findSubject(req.params.name, req.params.id);
        if (!retrievedSubject) return res.status(400).json({
            status: false,
            message: "This subject does not exist in this category"
        });

        await Subject.deleteOne({_id: req.params.id});
        res.status(200).json({
            status: true,
            message: "Subject has been successfully deleted",
            deletedSubject: retrievedSubject
        });
    } catch(err) {
        res.status(500).json({
            status: false,
            message: err
        })
    }
};