const express = require('express')
const asyncHandler = require('express-async-handler');


const router = express.Router();
const { Question } = require('../../db/models');



//get all questions
router.get('/', asyncHandler(async (req, res) => {
    const questions = await Question.findAll({ include: 'User' });
    return res.json(questions);
}))

//submit new question
router.post('/', asyncHandler(async (req, res) => {
    const question = await Question.create(req.body);
    return res.json(question);
}));

//delete a question
router.delete('/:id(\\d+)', asyncHandler(async (req, res) => {
    const questionId = req.params.id;

    if (questionId) {
        await Question.destroy({ where: { id: questionId } });
        return res.json(questionId);
    }
}));

//edit a question
router.put('/:id(\\d+)', asyncHandler(async (req, res) => {
    //this works!
    const questionId = req.params.id;
    //this works!
    const question = await Question.findOne({ where: { id: questionId } });

    if (question) {
        const updatedQuestion = await question.update(req.body);
        console.log('from backend', updatedQuestion)
        return res.json(updatedQuestion);
    }
}));

module.exports = router;
