const config = require('./knexfile')[process.env.ENVIRONMENT || 'development'];
const queryBuilder = require('knex')(config); 

module.exports = queryBuilder;