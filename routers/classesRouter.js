const express = require('express');
const router = express.Router();

const validateToken = require('../middleware/validateToken');
const { getAll, getClassByID, createClass, updateClassByID, removeClassByID } = require('../models/classesModel');

router.use(validateToken);

router.get('/', async (req, res) => {
  try {
    let classes = await getAll();
    res.status(200).json(classes);
  } catch {
    res.status(500).json({ errorMessage: 'Could not retrieve classes' });
  }
});

module.exports = router;