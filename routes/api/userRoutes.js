const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addThought,
  removeThought,
} = require('../../controllers/userController');

// route to get all users and create a new user
router.route('/').get(getUsers).post(createUser);

// route to get a single user and delete a user
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// route to add a thought to a user
router.route('/:userId/thoughts').post(addThought);

// route to remove a thought from a user
router.route('/:userId/thoughts/:thoughtId').delete(removeThought);

module.exports = router;
