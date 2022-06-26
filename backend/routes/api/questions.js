const express = require('express')
const asyncHandler = require('express-async-handler');
// const { requireAuth } = require('../../utils/auth.js');

const router = express.Router();
const { Question } = require('../../db/models');

router.post('/', asyncHandler(async (req, res) => {

}))

//get all questions
router.get('/', asyncHandler(async (req, res) => {
    const questions = await Question.findAll();
    // console.log('***************', questions);
    //WORkING!!!! IS AN ARRAY!
    return res.json(questions);
}))

module.exports = router;
