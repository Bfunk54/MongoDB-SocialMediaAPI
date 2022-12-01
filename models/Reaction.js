const { Schema, Types } = require("mongoose");

// Function to format date
function format_date(date) {
  // Format date as MM/DD/YYYY
  return date.toLocaleDateString();
}

// Schema to create a course model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
      default: "Unnamed Reaction",
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: format_date,
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

module.exports = reactionSchema;
