const bcrypt = require('bcrypt');

const data = {
     users: [
    {
      name: 'Zainab',
      email: 'admin@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: true,
    },
    {
      name: 'John',
      email: 'user@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: false,
    },
  ],

    products: [
      {
        name: 'Molang Birthday Cake Topper',
        category: 'Shirts',
        image: '/images/nnn.jpg',
        price: 12.74,
        countInStock: 10,
        brand: 'Nike',
        rating: 4.5,
        numReviews: 10,
        description: 'high quality product',
      },
      {
        name: 'POKEMON Birthday Tags',
        category: 'Shirts',
        image: '/images/p2.jpg',
        price: 10.19,
        countInStock: 20,
        brand: 'Adidas',
        rating: 4.0,
        numReviews: 10,
        description: 'high quality product',
      },
      {
        name: 'Lacoste Free Shirt',
        category: 'Shirts',
        image: '/images/p1.jpg',
        price: 220,
        countInStock: 0,
        brand: 'Lacoste',
        rating: 4.8,
        numReviews: 17,
        description: 'high quality product',
      },
      {
        name: 'Nike Slim Pant',
        category: 'Pants',
        image: '/images/p1.jpg',
        price: 78,
        countInStock: 15,
        brand: 'Nike',
        rating: 4.5,
        numReviews: 14,
        description: 'high quality product',
      },
      {
        name: 'Puma Slim Pant',
        category: 'Pants',
        image: '/images/p1.jpg',
        price: 65,
        countInStock: 5,
        brand: 'Puma',
        rating: 4.5,
        numReviews: 10,
        description: 'high quality product',
      },
      {
        name: 'Adidas Fit Pant',
        category: 'Pants',
        image: '/images/p1.jpg',
        price: 139,
        countInStock: 12,
        brand: 'Adidas',
        rating: 4.5,
        numReviews: 15,
        description: 'high quality product',
      },
    ],
  };
  module.exports = (data);
  