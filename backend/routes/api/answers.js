const express = require('express')
const asyncHandler = require('express-async-handler');

const router = express.Router();
const { Answer } = require('../../db/models');


//get all answers
router.get('/', asyncHandler(async (req, res) => {
    const answers = await Answer.findAll({
        include: ['User', 'Question']
    });
    console.log('***query results', answers);
    return res.json(answers);
}))



module.exports = router;
