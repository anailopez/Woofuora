const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();
const { Space } = require('../../db/models');


//get all spaces
router.get('/', asyncHandler(async (req,res) => {
    const spaces = await Space.findAll({
        include: ['']
    })
}))
