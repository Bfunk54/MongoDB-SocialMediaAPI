const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
} = require("../../controllers/thoughtController.js");

// route to get all thoughts and create a new thought
router.route("/").get(getThoughts).post(createThought);

// route to get a single thought, update a single thought and delete a thought
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// route to add a reaction to a thought
router.route("/:thoughtId/reactions").post(addReaction);

module.exports = router;
