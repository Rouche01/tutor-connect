const router = require('express').Router();
const { createDefaultCategories, category } = require('../controllers/category');

createDefaultCategories();

// route for listing all the categories available
router.get('/category', category);

module.exports = router;