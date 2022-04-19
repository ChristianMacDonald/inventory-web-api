exports.up = function(knex) {
  return knex.schema.createTable('classes', table => {
    table.integer('id');
    table.integer('department_id').references('departments.id').onUpdate('CASCADE').onDelete('CASCADE');
    table.string('name').notNullable();
    table.primary(['id', 'department_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('classes');  
};
