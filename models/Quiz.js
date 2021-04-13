const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },

  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },

  question_possibility: [
    {
      title_question: {
        type: String,
      },
      correct_answer: {
        type: String,
      },
      answers: [
        {
          type: String,
        },
      ],
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
