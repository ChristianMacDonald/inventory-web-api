const express = require('express');
const router = express.Router();

const authRouter = require('./authRouter');
const itemsRouter = require('./itemsRouter');
const departmentsRouter = require('./departmentsRouter');
const classesRouter = require('./classesRouter');

router.use('/auth', authRouter);
router.use('/items', itemsRouter);
router.use('/departments', departmentsRouter);
router.use('/classes', classesRouter);

module.exports = router;