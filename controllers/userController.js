const { User, Thought } = require("../models");

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Get a single user by id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId, include: Thought })
      .select("-__v")
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json({
              user,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Create a new user
  createUser(req, res) {
    /* example data
  {
   "username": "lernantino",
   "email": "lernantino@gmail.com"
  } */
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // Delete a user and remove them from the course
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "This user does not exist" })
          // If the user exists find all thoughts and remove all associated thoughts
          : Thought.deleteMany(
            // Find all thoughts where the username is the same one that matches the user id
              { username: user.username }
            )
      )
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: "User deleted, but no thoughts found",
            })
          : res.json({
              message: "User and all thoughts have been successfully deleted",
            })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      // find the user by id
      { _id: req.params.userId }, 
      // update the user
      req.body, 
      { new: true }
      )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "This user does not exist" })
          : res.json({ message: "User successfully updated" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add a friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      // find the user by id
      { _id: req.params.userId },
      // add the friend's id to the `friends` array
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "This user does not exist" })
          : res.json({ message: "This user has been added as a friend" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Remove a friend
  removeFriend(req, res) {
    User.findOneAndUpdate(
      // find the user by id
      { _id: req.params.userId },
      // remove the friend from the user's friend list
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "This user does not exist" })
          : res.json({ message: "This user has been removed as a friend" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
};
