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