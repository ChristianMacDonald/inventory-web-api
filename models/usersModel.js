const qb = require('../queryBuilder');

function getUserByUsername(username, includeAllFields=false) {
  let promise;

  if (includeAllFields) {
    promise = qb('users').where({ username }).first();
  } else {
    promise = qb('users').where({ username }).select('username').first();
  }

  return promise;
}

function getUserByID(id, includeAllFields=false) {
  let promise;

  if (includeAllFields) {
    promise = qb('users').where({ id }).first();
  } else {
    promise = qb('users').where({ id }).select('username').first();
  }

  return promise;
}

function createUser(user) {
  return qb('users').insert(user).returning('id');
}

function updateUserByID(id, changes) {
  return qb('users').where({ id }).update(changes);
}

function removeUserByID(id) {
  return qb('users').where({ id }).del();
}

module.exports = {
  getUserByUsername,
  getUserByID,
  createUser,
  updateUserByID,
  removeUserByID,
}