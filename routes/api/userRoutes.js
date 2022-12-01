const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  removeFriend,
  addFriend,
} = require("../../controllers/userController");

// route to get all users and create a new user
router.route("/").get(getUsers).post(createUser);

// route to get a single user and delete a user
router.route("/:userId").get(getSingleUser).delete(deleteUser);

// route to add and delete a friend
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
