const express = require('express');
const router = express.Router();

const authRouter = require('./authRouter');
const itemsRouter = require('./itemsRouter');

router.use('/auth', authRouter);
router.use('/items', itemsRouter);

module.exports = router;