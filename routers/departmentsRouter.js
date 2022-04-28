const express = require('express');
const router = express.Router();

const { getAll } = require('../models/departmentsModel');
const validateToken = require('../middleware/validateToken');

router.use(validateToken);

router.get('/', async (req, res) => {
    try {
        let departments = await getAll();
        res.status(200).json(departments);
    } catch {
        res.status(500).json({ errorMessage: 'Could not retrieve departments' });
    }
});

module.exports = router;