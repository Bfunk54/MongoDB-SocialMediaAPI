const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThoguht,
} = require('../../controllers/thoughtController.js');

// route to get all thoughts and create a new thought
router.route('/').get(getThoughts).post(createThought);

// route to get a single thought, update a single thought and delete a thought
router
  .route('/:thoughtId')
  .get(getSingleCourse)
  .put(updateCourse)
  .delete(deleteCourse);

module.exports = router;
