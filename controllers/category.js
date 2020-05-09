const Category = require('../models/Category');

// create the default categories
const createCategory = async (category, desc) => {
    const categoryExist = await Category.findOne({ name: category });
    if(!categoryExist) {
        try {
            await Category.create({
                name: category,
                description: desc
            });
        } catch(error) {
            return res.status(400).send({
                status: false,
                message: "Unable to initialize default categories"
            })
        }
    }
}

const defaultCategories = [
    {name: "Primary", desc: "This is for primary school students"},
    {name: "JSS", desc: "This is for Junior secondary school students"},
    {name: "SSS", desc: "This is for Senior Secondary School Students"}
]

exports.createDefaultCategories = () => {
    defaultCategories.forEach(category => {
        createCategory(category.name, category.desc);
    });
}

exports.category = async (req, res, next) => {
    try {
        const categoryList = await Category.find();
        res.status(200).json(categoryList);
    } catch(err) {
        res.status(400).json({
            status: false,
            message: "Unable to retrieve the list of categories"
        })
    }
}


exports.updateCategory = async(req, res, next) => {
    const { name, description } = req.body;
     if(!name && !description) return res.status(400).json({
        status: false,
        message: "The name and description fields are required"
    });

    const paramsNameRegExp = new RegExp("^" + req.params.category_name + "$", "i");
    try {
        const category = await Category.findOne({name: { $regex: paramsNameRegExp } });
        if(!category) return res.status(404).json({
            status: false,
            message: "This category does not exist"
        });

        let newValues = { $set: {  } };
        if (name) { 
            newValues.$set.name = name;
        }
        if (description) {
            newValues.$set.description = description;
        }

        const updatedCategory = await Category.updateOne({name: { $regex: paramsNameRegExp }}, newValues);
        res.status(200).json({
            status: true,
            message: `${updatedCategory.nModified} category was modified successfully`
        })
    } catch(err) {
        res.status(500).json({
            status: false,
            message: "Unable to modify category"
        })
    }


}

exports.deleteCategory = async(req, res, next) => {
    const paramsNameRegExp = new RegExp("^" + req.params.category_name + "$", "i");
    try {
        const category = await Category.findOne({name: { $regex: paramsNameRegExp }});
        if(!category) return res.status("This category does not exist");

        await Category.remove({name: { $regex: paramsNameRegExp }});
        res.status(200).json({
            status: true,
            message: "Category deleted successfully",
            deletedCategory: category
        })
    } catch(err) {
        res.status(500).send(err);
    }
}