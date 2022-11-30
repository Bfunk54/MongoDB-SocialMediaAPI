const { Schema, Types } = require('mongoose');

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
      default: 'Unnamed Reaction',
    },
    username: {
      type: String,
      required: true,
    },
    timestamps: true,
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

module.exports = reactionSchema;
