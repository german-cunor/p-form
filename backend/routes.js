const express = require("express");
const { Question, Choice } = require("./models");

const router = express.Router();

router.get("/questions", async (req, res) => {
    const questions = await Question.findAll({ include: Choice });
    res.json(questions);
});

module.exports = router;
