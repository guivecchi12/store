const inventory = [
    {
          title: 'The Art Of War',
          price: 10.11,
          image:
              'https://images-na.ssl-images-amazon.com/images/I/41FBMkY3cgL._SX331_BO1,204,203,200_.jpg'
      },
      {
          title: 'Civilization and Its Discontents',
          price: 14.29,
          image:
              'https://images-na.ssl-images-amazon.com/images/I/51Jj12iMZnL._SX331_BO1,204,203,200_.jpg'
      },
      {
          title: 'Influence: The Psychology of Persuasion',
          price: 10.98,
          image:
              'https://images-na.ssl-images-amazon.com/images/I/512-B-1yXuL._SX331_BO1,204,203,200_.jpg'
      },
      {
          title: 'Grokking Algorithms',
          price: 40.00,
          image:
              'https://images-na.ssl-images-amazon.com/images/I/61uUPXbhMxL._SX397_BO1,204,203,200_.jpg'
      }
  ]
  exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('inventory').del()
      .then(function () {
        // Inserts seed entries
        return knex('inventory').insert(inventory);
      });
  };
  