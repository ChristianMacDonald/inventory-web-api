const qb = require('../queryBuilder');

function getAll() {
  return qb('classes');
}

function getClassByDepartmentAndClassIDs(department_id, id) {
  return qb('classes').where({ department_id, id }).first();
}

function getClassesByDepartmentID(department_id) {
  return qb('classes').where({ department_id });
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
  getClassByDepartmentAndClassIDs,
  getClassesByDepartmentID,
  createClass,
  updateClassByID,
  removeClassByID
};