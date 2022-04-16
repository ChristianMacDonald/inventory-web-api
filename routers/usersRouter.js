const express = require('express');
const router = express.Router();
const { getUserByUsername, createUser, getUserByID } = require('../models/usersModel');
const queryBuilder = require('../queryBuilder');

router.get('/:id', async (req, res) => {
  try {
    let user = await getUserByID(req.params.id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: `User with username ${req.params.id} not found`});
    }
  } catch {
    res.status(500).json({ errorMessage: 'Could not retrieve user'});
  }
});

router.post('/', async (req, res) => {
  try {
    if (req.body.username && req.body.password) {
      let [{id}] = await createUser(req.body);
      let user = await getUserByID(id);
      res.status(201).json(user);
    } else {
      res.status(400).json({ message: `Missing required fields` });
    }
  } catch {
    res.status(500).json({ errorMessage: 'Could not create user' });
  }
});

module.exports = router;