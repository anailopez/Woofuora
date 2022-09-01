const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();
const { Space } = require('../../db/models');


//get all spaces
router.get('/', asyncHandler(async (req, res) => {
    const spaces = await Space.findAll();
    return res.json(spaces);
}));

//create a space
router.post('/create', asyncHandler(async (req, res) => {
    const space = await Space.create(req.body);
    return res.json(space);
}))

//delete a space
router.delete('/:id(\\d+)/delete', asyncHandler(async (req, res) => {
    const spaceId = req.params.id;

    if (spaceId) {
        await Space.destroy({ where: { id: spaceId } });
        return res.json(spaceId)
    }
}))

module.exports = router;
