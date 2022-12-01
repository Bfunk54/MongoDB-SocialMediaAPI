const { User, Thought } = require("../models");

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(async (thoughts) => {
        const thoughtsObj = {
          thoughts,
        };
        return res.json(thoughtsObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Get a single thought by id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json({
              thought,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Create a new thought
  createThought(req, res) {
    /* example data
{
  "thoughtText": "Here's a cool thought...",
  "username": "lernantino",
  "userId": "5edff358a0fcb779aa7b118b"
} */
    Thought.create(req.body)
      .then((thought) =>
        res.json(
          User.findOneAndUpdate(
            // find the user by id
            { _id: req.params.userId },
            // add the thought id to the user's `thoughts` array field
            { $push: { thoughts: thought._id } },
            { new: true }
          )
        )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "Thought created, but no user found at that id",
            })
          : res.json({
              message:
                "Thought has been created and assigned to the user have been successfully deleted",
            })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.userId })
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: "No thought found with that ID",
            })
          : res.json({
              message: "The thought has been successfully deleted",
            })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
        // find the thought by its id
        { _id: req.params.thoughtId },
        // update the thought by its `thoughtText` value
        req.body, 
        { new: true }
        )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "This is not the thought you are looking for" })
          : res.json({ message: "Thought successfully updated" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

    // Add a reaction to a thought
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            // find the thought by id
            { _id: req.params.thoughtId },
            // add the reaction to the thought's reactions array
            { $push: { reactions: req.body } },
            { new: true }
        )
            .then((thought) =>
            !thought
                ? res.status(404).json({ message: "No thought with that ID" })
                : res.json({ message: "Reaction successfully added" })
            )
            .catch((err) => {
            console.log(err);
            res.status(500).json(err);
            });
        },

    // Remove a reaction from a thought
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            // find the thought by id
            { _id: req.params.thoughtId },
            // remove the reaction from the thought's reactions array
            { $pull: { reactions: { reactionId: req.body.reactionId } } },
            { new: true }
        )
            .then((thought) =>
            !thought
                ? res.status(404).json({ message: "No thought with that ID" })
                : res.json({ message: "Reaction successfully removed" })
            )
            .catch((err) => {
            console.log(err);
            res.status(500).json(err);
            });
        }
};
