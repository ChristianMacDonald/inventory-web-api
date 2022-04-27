const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { getUserByUsername, createUser, getUserByID, removeUserByID, updateUserByID } = require('../models/usersModel');
const validateToken = require('../middleware/validateToken');

router.get('/user', validateToken, async (req, res) => {
  let { username } = req.tokenPayload;

  try {
    let user = await getUserByUsername(username);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: `User with username ${req.params.id} not found`});
    }
  } catch {
    res.status(500).json({ errorMessage: 'Could not retrieve user'});
  }
});

router.post('/test-token', validateToken, (req, res) => {
  res.status(200).json(req.tokenPayload);
});

router.post('/login', async (req, res) => {
  try {
    let { username, password } = req.body;

    if (username && password) {
      let user = await getUserByUsername(username, true);

      if (username === user.username && bcrypt.compareSync(password, user.password)) {
        let token = jwt.sign({ username }, process.env.JWT_SECRET);
        res.status(200).json({ token });
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

router.put('/password', validateToken, async (req, res) => {
  let { username } = req.tokenPayload;
  let { old_password, new_password } = req.body;

  if (old_password && new_password) {
    try {
      let user = await getUserByUsername(username, true);
  
      if (user) {
        if (bcrypt.compareSync(old_password, user.password)) {
          let salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
          let hash = bcrypt.hashSync(new_password, salt);
          await updateUserByID(user.id, { password: hash });
          res.status(200).json({ message: 'Password successfully changed' });
        } else {
          res.status(401).json({ message: 'Incorrect password' });
        }
      } else {
        res.status(404).json({ message: `Could not find user with username ${username}` });
      }
    } catch {
      res.status(500).json({ errorMessage: `Could not edit user with username ${username}` });
    }
  } else {
    res.status(400).json({ message: 'Missing required fields' });
  }
});

router.delete('/user', validateToken, async (req, res) => {
  let { username } = req.tokenPayload;

  try {
    let user = await getUserByUsername(username, true);

    if (user) {
      await removeUserByID(user.id);
      res.status(200).json({ message: `Successfully deleted user with username ${username}` });
    } else {
      res.status(404).json({ message: `Could not find user with username ${username}` });
    }
  } catch {
    res.status(500).json({ errorMessage: `Could not delete user with username ${username}` });
  }
});

module.exports = router;