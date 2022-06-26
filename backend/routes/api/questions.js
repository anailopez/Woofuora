const express = require('express')
const asyncHandler = require('express-async-handler');
// const { requireAuth } = require('../../utils/auth.js');


const router = express.Router();
const { Question } = require('../../db/models');



//get all questions
router.get('/', asyncHandler(async (req, res) => {
    const questions = await Question.findAll();
    return res.json(questions);
}))

//submit new question
router.post('/', asyncHandler(async (req, res) => {
    const question = await Question.create(req.body);
    return res.json(question);
}))

module.exports = router;
