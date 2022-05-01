const express = require('express');
const router = express.Router();

const { getAll, getDepartmentByID, createDepartment, removeDepartmentByID, updateDepartmentByID } = require('../models/departmentsModel');
const { getClassesByDepartmentID, getClassByDepartmentAndClassIDs } = require('../models/classesModel');
const { getItemByDPCI, getItemsByDepartmentAndClassIDs } = require('../models/itemsModel');
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

router.get('/:id/classes', async (req, res) => {
    let { id } = req.params;

    try {
        let department = await getDepartmentByID(id);

        if (department) {
            let classes = await getClassesByDepartmentID(id);
            res.status(200).json(classes);
        } else {
            res.status(404).json({ message: `Department with id ${id} not found` })
        }
    } catch {
        res.status(500).json({ errorMessage: `Could not retrieve classes with department_id ${id}` });
    }
});

router.get('/:id/classes/:class_id', async (req, res) => {
    let id = parseInt(req.params.id);
    let class_id = parseInt(req.params.class_id);

    try {
        let department = await getDepartmentByID(id);

        if (department) {
            let classes = await getClassByDepartmentAndClassIDs(id, class_id);
            res.status(200).json(classes);
        } else {
            res.status(404).json({ message: `Department with id ${id} not found` });
        }
    } catch {
        res.status(500).json({ errorMessage: `Could not retrieve class with id ${class_id} and department_id ${id}` });
    }
});

router.get('/:id/classes/:class_id/items', async (req, res) => {
    let { id, class_id } = req.params;

    id = parseInt(id);
    class_id = parseInt(class_id);

    try {
        let department = await getDepartmentByID(id);

        if (department) {
            let itemClass = await getClassByDepartmentAndClassIDs(id, class_id);

            if (itemClass) {
                let items = await getItemsByDepartmentAndClassIDs(id, class_id);
                res.status(200).json(items);
            } else {
                res.status(404).json({ message: `Class with id ${id} not found` })
            }
        } else {
            res.status(404).json({ message: `Department with id ${id} not found` });
        }
    } catch {
        res.status(500).json({ errorMessage: `Could not retrieve items with department_id ${id} and class_id ${class_id}` })
    }
});

router.get('/:id/classes/:class_id/items/:item_id', async (req, res) => {
    let { id, class_id, item_id } = req.params;

    id = parseInt(id);
    class_id = parseInt(class_id);
    item_id = parseInt(item_id);

    try {
        let department = await getDepartmentByID(id);

        if (department) {
            let itemClass = await getClassByDepartmentAndClassIDs(id, class_id);

            if (itemClass) {
                let item = await getItemByDPCI(id, class_id, item_id);

                if (item) {
                    item.class_name = itemClass.name;
                    item.department_name = department.name;
                    item.dpci = `${id.toString().padStart(3, '0')}-${class_id.toString().padStart(2, '0')}-${item_id.toString().padStart(4, '0')}`;
                    res.status(200).json(item);
                } else {
                    res.status(404).json({ message: `Item with id ${item_id} not found` });
                }
            } else {
                res.status(404).json({ message: `Class with id ${class_id} not found` });
            }
        } else {
            res.status(404).json({ message: `Department with id ${id} not found` });
        }
    } catch {
        res.status(500).json({ errorMessage: `Could not retrieve item with department_id ${id}, class_id ${class_id}, and id ${item_id}` })
    }
});

router.post('/', async (req, res) => {
    let department = req.body;

    try {
        await createDepartment(department);
        res.status(201).json(department);
    } catch {
        res.status(500).json({ errorMessage: 'Could not create department' });
    }
});

router.put('/:id', async (req, res) => {
    let { id } = req.params;

    try {
        let department = await getDepartmentByID(id);

        if (department) {
            await updateDepartmentByID(id, req.body);
            department = await getDepartmentByID(id);
            res.status(200).json(department);
        } else {
            res.status(404).json({ message: `Department with id ${id} not found` });
        }
    } catch {
        res.status(500).json({ errorMessage: `Could not update department with id ${id}` });
    }
});

router.delete('/:id', async (req, res) => {
    let { id } = req.params;

    try {
        let department = await getDepartmentByID(id);

        if (department) {
            await removeDepartmentByID(id);
            res.status(200).json(department);
        } else {
            res.status(404).json({ message: `Department with id ${id} not found` });
        }
    } catch {
        res.status(500).json({ errorMessage: `Could not delete department with id ${id}` });
    }
});

module.exports = router;