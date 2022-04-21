exports.seed = async function(knex) {
  await knex('items').del()
  await knex('items').insert([
    { id: 1, class_id: 1, department_id: 1, name: 'Apple Lightning to USB Cable' },
    { id: 1, class_id: 1, department_id: 2, name: 'Stila Stay All Day Waterproof Liquid Eyeliner' },
    { id: 1, class_id: 1, department_id: 3, name: 'Women\'s Short Sleeve Casual T-Shirt - A New Day™' },
    { id: 1, class_id: 1, department_id: 4, name: 'Nuby Ice Gel Baby Teether Keys' },
    { id: 1, class_id: 1, department_id: 5, name: 'Chuckle & Roar 4 Pack of Jigsaw Puzzles 550pc' },
    { id: 1, class_id: 1, department_id: 6, name: 'Heinz Tomato Ketchup 32oz' },
    { id: 1, class_id: 1, department_id: 7, name: 'Pup-Peroni® Original Beef Dog Treats' },
    { id: 1, class_id: 1, department_id: 8, name: 'Cadbury Creme Easter Egg - 4.8oz/4ct' },
    { id: 1, class_id: 1, department_id: 9, name: 'Make-A-Size Paper Towels - up & up™' },
    { id: 1, class_id: 1, department_id: 10, name: 'Arm & Hammer Plus OxiClean Fresh Scent Liquid Laundry Detergent' },
    { id: 1, class_id: 1, department_id: 11, name: 'Acetaminophen Extra Strength Pain Reliever & Fever Reducer Caplets - up & up™' },
    { id: 1, class_id: 1, department_id: 12, name: '30pc Kitchen Utensil Set - Room Essentials™' },
    { id: 1, class_id: 1, department_id: 13, name: 'Crayola 240-Sheet Construction Paper 12-Color' },
    { id: 1, class_id: 1, department_id: 14, name: 'Duracell Coppertop AA Batteries - 20 Pack Alkaline Battery' },
  ]);
};
