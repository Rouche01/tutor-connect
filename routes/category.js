const router = require('express').Router();
const { createDefaultCategories, category } = require('../controllers/category');
const { isAuth } = require('../middlewares/auth');

createDefaultCategories();

// route for listing all the categories available
router.get('/category', isAuth, category);

module.exports = router;