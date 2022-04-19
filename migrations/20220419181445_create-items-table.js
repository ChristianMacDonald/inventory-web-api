exports.up = function(knex) {
  return knex.schema.createTable('items', table => {
    table.integer('id');
    table.integer('class_id');
    table.integer('department_id');
    table.primary(['id', 'class_id', 'department_id']);
    table.foreign(['class_id', 'department_id']).references(['classes.id', 'classes.department_id']);
    table.string('name').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('items');
};
