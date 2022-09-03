const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const questionsRouter = require('./questions.js');
const answersRouter = require('./answers.js');
const spacesRouter = require('./spaces.js');
const repliesRouter = require('./replies.js');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/questions', questionsRouter);
router.use('/answers', answersRouter);
router.use('/spaces', spacesRouter);
router.use('/replies', repliesRouter);

module.exports = router;
