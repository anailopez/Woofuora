const { check } = require('express-validator');
const { handleValidationErrors } = require('./validation');

const title =
    check('title')
        .notEmpty()
        .withMessage("Title cannot be empty.")
        .isLength({ max: 300 })
        .withMessage("Title cannot be longer than 300 characters.")
const image =
    check('image')
        .isURL()
        .withMessage("The value for image must be a valid URL.")
        .isLength({ max: 250 })
        .withMessage("The image URL cannot be longer than 250 characters")

exports.validateQuestion = [
    title,
    image,
    handleValidationErrors
];
