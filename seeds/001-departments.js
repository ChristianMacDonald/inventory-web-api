exports.seed = async function(knex) {
  await knex('departments').del()
  await knex('departments').insert([
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Beauty' },
    { id: 3, name: 'Style' },
    { id: 4, name: 'Baby' },
    { id: 5, name: 'Toys' },
    { id: 6, name: 'Grocery' },
    { id: 7, name: 'Pets' },
    { id: 8, name: 'Seasonal' },
    { id: 9, name: 'Paper' },
    { id: 10, name: 'Chemicals' },
    { id: 11, name: 'OTC' },
    { id: 12, name: 'Kitchen' },
    { id: 13, name: 'Stationery' },
    { id: 14, name: 'Check Lanes' }
  ]);
};
