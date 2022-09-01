const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();
const { Space } = require('../../db/models');


//get all spaces
router.get('/', asyncHandler(async (req, res) => {
    const spaces = await Space.findAll();
    return res.json(spaces);
}));

// //get one question
// router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
//     const spaceId = req.params.id;
//     const space = Space.findOne({ where: { id: spaceId } })
//     return res.json(space);
// }))

module.exports = router;
