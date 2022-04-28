const express = require('express');
const router = express.Router();

const { getAll, getDepartmentByID } = require('../models/departmentsModel');
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

router.get('/:id', async (req, res) => {
    let { id } = req.params;

    try {
        let department = await getDepartmentByID(id);
        
        if (department) {
            res.status(200).json(department);
        } else {
            res.status(404).json({ message: `Department with id ${id} not found` });
        }
    } catch {
        res.status(500).json({ errorMessage: 'Could not retrieve department' });
    }
});

module.exports = router;