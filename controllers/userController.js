const { ObjectId } = require('mongoose').Types;
const { User , Thought } = require('../models');

module.exports = {
    // Route to get all users
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
      
        // Route to get a single user by id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId, include: Thought })
      .select('-__v')
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
              user,
              friends: await friend(req.params.userId),
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

   // route to create a new user
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
          ? res.status(404).json({ message: 'This user does not exist' })
          : Thought.findOneAndUpdate(
              { user: req.params.userId },
              { $pull: { user: req.params.userId } },
              { new: true }
            )
      )
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: 'User deleted, but no thoughts found',
            })
          : res.json({ message: 'User successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },