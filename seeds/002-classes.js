exports.seed = async function(knex) {
  await knex('classes').del();
  await knex('classes').insert([
    { id: 1, department_id: 1, name: 'Charging Cables' },
    { id: 1, department_id: 2, name: 'Eyeliner' },
    { id: 1, department_id: 3, name: 'T-Shirts' },
    { id: 1, department_id: 4, name: 'Teething Toys' },
    { id: 1, department_id: 5, name: 'Puzzles' },
    { id: 1, department_id: 6, name: 'Condiments' },
    { id: 1, department_id: 7, name: 'Dog Treats' },
    { id: 1, department_id: 8, name: 'Easter Candy' },
    { id: 1, department_id: 9, name: 'Paper Towels' },
    { id: 1, department_id: 10, name: 'Laundry Detergent' },
    { id: 1, department_id: 11, name: 'Pain Relief Medication' },
    { id: 1, department_id: 12, name: 'Utensils' },
    { id: 1, department_id: 13, name: 'Construction Paper' },
    { id: 1, department_id: 14, name: 'Batteries' }
  ]);
};
