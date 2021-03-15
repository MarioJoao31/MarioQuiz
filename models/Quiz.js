const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
  },

  question_text: {
    type: String,
    required: true,
  },
  question_type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  

  question_possibility: [
    {
      answer: {
        type: String,
      },
      correct_answer: {
        type: String,
      },
    },
  ],

  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
    },
  ],

  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  upload_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("quiz", QuizSchema);
