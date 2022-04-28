const qb = require('../queryBuilder');

function getAll() {
    return qb('departments');
}

function getDepartmentByID(id) {
    return qb('departments').where({ id }).first();
}

function createDepartment(department) {
    return qb('departments').insert(department).returning('id');
}

function updateDepartmentByID(id, changes) {
    return qb('departments').where({ id }).update(changes);
}

function removeDepartmentByID(id) {
    return qb('departments').where({ id }).del();
}

module.exports = {
    getAll,
    getDepartmentByID,
    createDepartment,
    updateDepartmentByID,
    removeDepartmentByID
}