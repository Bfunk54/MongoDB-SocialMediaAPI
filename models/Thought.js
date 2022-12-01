const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

function format_date(date) {
  // Format date as MM/DD/YYYY
  return date.toLocaleDateString();
}

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
      default: 'Unnamed Thought',
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: { 
      type: Date, 
      default: Date.now, 
      get: format_date 
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);


thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
