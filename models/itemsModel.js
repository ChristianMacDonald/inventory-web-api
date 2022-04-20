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

function getItemsByDepartmentAndClass(department_id, class_id) {
  return qb('items').where({ department_id, class_id });
}

function createItem(item) {
  return qb('items').insert(item).returning(['department_id', 'class_id', 'id']);
}

module.exports = {
  getAll,
  getItemByDPCI,
  getItemsByDepartment,
  getItemsByDepartmentAndClass,
  createItem
};