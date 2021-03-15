const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Quiz = require("../../models/Quiz");
const User = require("../../models/User");
const auth = require("../../middleware/auth");
const checkObjectId = require("../../middleware/checkObjectId");

//TODO: ACABAR AQUI A MERDA DAS ROUTES PARA O QUIZ

//@rout Post api/quizes
//@desc Cria uma sala
//@access private

router.post(
  "/",
  [
    auth,
    [
      check("question_text", "Texto da pergunta!").notEmpty(),
      check("question_type", "Tipo de pergunta!").notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      //FIXME:Pode ser preciso voltar aqui quando eu tiver ja a fazer o front end do quiz, não sei se tenho de aceitar aqui as questions_possabilities e correct_answer!!
      const newQuiz = new Quiz({
        question_text: req.body.question_text,
        question_type: req.body.question_type,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const quiz = await newQuiz.save();
      res.json(quiz);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error ao criar a sala");
    }
  }
);

//@rout Post api/quizes/question/:id
//@desc Cria uma pergunta no quiz
//@access private
router.post(
  "/question/:id",
  [auth, [check("answer", "Falta preencher a answer").notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    //check user a ver se é igual se for avança
    if (quiz.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "user não autorizado" });
    } 

    try {
      const quiz = await Quiz.findById(req.params.id);

      if (!quiz) {
        return res.status(401).json({ msg: "nao foi encontrado o quiz" });
      }

      const newQuestion = {
        answer: req.body.answer,
      };

      //FIXME: nao esta a funcionar inserir uma pergunta

      quiz.question_possibility.unshift(newQuestion);

      await quiz.save();

      res.json(quiz.question_possibility);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error ao criar a sala");
    }
  }
);

// @route    GET api/quizes
// @desc     Get all quizes
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const quizes = await Quiz.find().sort({ date: -1 });
    res.json(quizes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/quizes/:id
// @desc     Get quizes by ID
// @access   Private
router.get("/:id", auth, checkObjectId("id"), async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ msg: "Quiz not found" });
    }

    res.json(quiz);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/quizes/:id
// @desc     ELIMINA quizes by ID
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(401).json({ msg: "Quiz não foi encontrado!" });
    }

    //check user a ver se é igual se for avança para a eliminação
    if (quiz.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "user não autorizado" });
    }

    await quiz.remove();

    res.json({ msg: `Sala ${req.params.id} removida ` });
  } catch (err) {
    console.error(err.message);
    if (!err.kind === "ObjectId") {
      return res.status(500).json({ msg: "Quiz não foi encontrado" });
    }
    res.status(500).send("Server error");
  }
});

//TODO: tenho de acabar de fazer o resto da rotas para o quiz para começar a fazer o FrontEnd

//@rout PUT api/quizes/like/:id
//@desc Like a quiz
//@access private

router.put("/like/:id", auth, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    // Check if the post has already been liked
    if (quiz.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: "Quiz ja tem like" });
    }

    quiz.likes.unshift({ user: req.user.id });

    await quiz.save();

    return res.json(Quiz.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@rout PUT api/posts/unlike/:id
//@desc remove like da sala
//@access private

router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    // Check if the post has not yet been liked
    if (!quiz.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: "Post has not yet been liked" });
    }

    // remove the like
    quiz.likes = quiz.likes.filter(
      ({ user }) => user.toString() !== req.user.id
    );

    await quiz.save();

    return res.json(quiz.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@rout POST api/posts/Comment/:id
//@desc Comenta a sala
//@access private

router.post(
  "/comment/:id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const quiz = await Quiz.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      quiz.comments.unshift(newComment);

      await quiz.save();

      res.json(quiz.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@rout Delete api/posts/Comment/:id/:comment_id
//@desc elimina comentario
//@access private
router.delete("/:id/:comment_id", auth, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    //pull comentario
    const comment = quiz.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    // ve se comentario existe
    if (!comment) {
      return res.status(404).json({ msg: "Comentario nao existe no quiz!" });
    }

    //checka user
    if (comment.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: "User nao tem autorização" });
    }

    quiz.comments = quiz.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await quiz.save();

    res.json(quiz.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
