const express = require('express');
const router = express.Router();

const { getAll, getItemByDPCI, createItem } = require('../models/itemsModel');

router.get('/', async (req, res) => {
  try {
    let items = await getAll();
    res.status(200).json(items);
  } catch {
    res.status(500).json({ errorMessage: 'Could not retrieve items' });
  }
});

router.get('/:dpci', async (req, res) => {
  let { dpci } = req.params;
  let department_id, class_id, id;
  if (dpci.length === 11) {
    let isNumber = [true, true, true, false, true, true, false, true, true, true, true];
    let valid = true;

    for (let i = 0; i < dpci.length; i++) {
      if (isNumber[i]) {
        if (isNaN(dpci[i])) {
          valid = false;
          break;
        }
      } else {
        if (dpci[i] != '-') {
          valid = false;
          break;
        }
      }
    }

    if (valid) {
      department_id = parseInt(dpci.substring(0, 3));
      class_id = parseInt(dpci.substring(4, 6));
      id = parseInt(dpci.substring(7, 11));

      try {
        let item = await getItemByDPCI(department_id, class_id, id);
        res.status(200).json(item);
      } catch {
        res.status(500).json({ errorMessage: 'Could not retrieve item' });
      }
    } else {
      res.status(400).json({ message: 'Invalid DPCI' });
    }
  } else {
    res.status(400).json({ message: 'Invalid DPCI' });
  }
});

router.post('/', async (req, res) => {
  if (req.body.department_id && req.body.class_id && req.body.id && req.body.name) {
    try {
      let [{ department_id, class_id, id }] = await createItem(req.body);
      let item = await getItemByDPCI(department_id, class_id, id);
      res.status(201).json(item);
    } catch {
      res.status(500).json({ errorMessage: 'Could not create new item' });
    }
  } else {
    res.status(400).json({ message: 'Missing required fields' });
  }
});

module.exports = router;