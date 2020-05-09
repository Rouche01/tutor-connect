const router = require('express').Router();
const { createDefaultCategories, category, updateCategory, deleteCategory } = require('../controllers/category');
const { isAuth, checkRole } = require('../middlewares/auth');

createDefaultCategories();

// route for listing all the categories available
router.get('/categories', isAuth, category);

// route for updating a category 
router.patch('/category/:category_name', isAuth, checkRole('admin'), updateCategory);

// route for removing a category and all its subjects
router.delete('/category/:category_name', isAuth, checkRole('admin'), deleteCategory);

module.exports = router;