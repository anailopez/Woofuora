const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();
const { Reply } = require('../../db/models');

//get all replies
router.get('/', asyncHandler(async (req, res) => {
    const replies = await Reply.findAll({
        include: 'User'
    });
    return res.json(replies);
}));

//create a reply
router.post('/', asyncHandler(async (req, res) => {
    const reply = await Reply.create(req.body);
    return res.json(reply);
}));



module.exports = router;
