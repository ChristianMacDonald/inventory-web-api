const qb = require('../queryBuilder');

function getUserByUsername(username) {
  return qb('users').where({ username }).first();
}

function getUserByID(id) {
  return qb('users').where({ id }).first();
}

function createUser(user) {
  return qb('users').insert(user).returning('id');
}

module.exports = {
  getUserByUsername,
  getUserByID,
  createUser
}