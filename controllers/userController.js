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