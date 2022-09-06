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

//delete a reply
router.delete('/:id(\\d+)/delete', asyncHandler(async (req, res) => {
    const replyId = req.params.id;

    if (replyId) {
        await Reply.destroy({ where: { id: replyId } })
        return res.json(replyId);
    }
}))


module.exports = router;
