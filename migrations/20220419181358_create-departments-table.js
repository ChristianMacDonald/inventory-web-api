exports.up = function(knex) {
  return knex.schema.createTable('departments', table => {
    table.integer('id').primary();
    table.string('name').notNullable();
  });  
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('departments');
};
