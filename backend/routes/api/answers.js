const express = require('express')
const asyncHandler = require('express-async-handler');

const router = express.Router();
const { Answer } = require('../../db/models');


//get all answers
router.get('/', asyncHandler(async (req, res) => {
    const answers = await Answer.findAll({
        include: ['User', 'Question'],
        order: [['createdAt', 'DESC']]
    });
    return res.json(answers);
}));


//submit new answer
router.post('/', asyncHandler(async (req, res) => {
    const answer = await Answer.create(req.body);
    return res.json(answer);
}));


//delete an answer
router.delete('/:id(\\d+)', asyncHandler(async (req, res) => {
    const answerId = req.params.id;

    if (answerId) {
        await Answer.destroy({ where: { id: answerId } });
        return res.json(answerId);
    }
}))

//edit an answer
router.put('/:id(\\d+)/edit', asyncHandler(async (req, res) => {
    const answerId = req.params.id;
    const answer = await Answer.findOne({ where: { id: answerId } });

    if (answer) {
        const updatedAnswer = await answer.update(req.body);
        return res.json(updatedAnswer);
    }
}));


module.exports = router;
