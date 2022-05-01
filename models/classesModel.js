const qb = require('../queryBuilder');

function getAll() {
  return qb('classes');
}

function getClassByID(id) {
  return qb('classes').where({ id }).first();
}

function createClass(itemClass) {
  return qb('classes').where({ id }).insert(itemClass).returning('id');
}

function updateClassByID(id, changes) {
  return qb('classes').where({ id }).update(changes);
}

function removeClassByID(id) {
  return qb('classes').where({ id }).del();
}

module.exports = {
  getAll,
  getClassByID,
  createClass,
  updateClassByID,
  removeClassByID
};