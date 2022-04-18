const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

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

router.post('/login', async (req, res) => {
  try {
    let { username, password } = req.body;

    if (username && password) {
      let user = await getUserByUsername(username, true);

      if (username === user.username && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: 'Successfully logged in' });
      } else {
        res.status(401).json({ message: 'Incorrect username or password' });
      }
    } else {
      res.status(400).json({ message: 'Missing required fields' });
    }
  } catch {
    res.status(500).json({ errorMessage: 'Could not login' });
  }
});

router.post('/register', async (req, res) => {
  try {
    if (req.body.username && req.body.password) {
      let salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
      req.body.password = bcrypt.hashSync(req.body.password, salt);
      let [{id}] = await createUser(req.body);
      let user = await getUserByID(id);
      res.status(201).json(user);
    } else {
      res.status(400).json({ message: 'Missing required fields' });
    }
  } catch {
    res.status(500).json({ errorMessage: 'Could not create user' });
  }
});

module.exports = router;