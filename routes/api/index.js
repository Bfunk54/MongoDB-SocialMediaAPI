const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

router.use('/courses', thoughtRoutes);
router.use('/students', userRoutes);

module.exports = router;
