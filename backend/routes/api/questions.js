const express = require('express')
const asyncHandler = require('express-async-handler');
// const { requireAuth } = require('../../utils/auth.js');

const router = express.Router();
const { Question } = require('../../db/models');
const { validateQuestion } = require('../../utils/question-validations');

router.post('/', asyncHandler(async (req, res) => {

}))

//get all questions
router.get('/', asyncHandler(async (req, res) => {
    const questions = await Question.findAll();
    // console.log('***************', questions);
    //WORkING!!!! IS AN ARRAY!
    return res.json(questions);
}))

//submit new question
router.post('/', validateQuestion, asyncHandler(async (req, res) => {
    const question = await Question.create(req.body);
    console.log('from backend', question);
    return res.json(question);
}))

module.exports = router;
