const express = require('express')
const asyncHandler = require('express-async-handler');

const router = express.Router();
const { Answer } = require('../../db/models');


//get all answers
router.get('/', asyncHandler(async (req, res) => {
    const answers = await Answer.findAll({
        include: ['User', 'Question']
    });
    return res.json(answers);
}))


//submit new answer
router.post('/', asyncHandler(async (req, res) => {
    const answer = await Answer.create(req.body);
    return res.json(answer);
}))


module.exports = router;
