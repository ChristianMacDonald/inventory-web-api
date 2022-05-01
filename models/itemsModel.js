const qb = require('../queryBuilder');

function getAll() {
  return qb('items');
}

function getItemByDPCI(department_id, class_id, id) {
  return qb('items').where({ department_id, class_id, id }).first();
}

function getItemsByDepartment(department_id) {
  return qb('items').where({ department_id });
}

function getItemsByDepartmentAndClassIDs(department_id, class_id) {
  return qb('items').where({ department_id, class_id });
}

function createItem(item) {
  return qb('items').insert(item).returning(['department_id', 'class_id', 'id']);
}

function updateItemByDPCI(department_id, class_id, id, changes) {
  return qb('items').where({ department_id, class_id, id }).update(changes);
}

function removeItemByDPCI(department_id, class_id, id) {
  return qb('items').where({ department_id, class_id, id }).del();
}

module.exports = {
  getAll,
  getItemByDPCI,
  getItemsByDepartment,
  getItemsByDepartmentAndClassIDs,
  createItem,
  updateItemByDPCI,
  removeItemByDPCI
};