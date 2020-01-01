const faker = require('faker');

module.exports = () => {
  const data = { products: [] };

  for (let i = 0; i < 40; i++) {
    data.products.push({
      id: i,
      name: faker.commerce.productName(),
      color: faker.commerce.color(),
      price: faker.commerce.price(),
      description: 'desc',
      image: {
        src: faker.image.fashion(),
      },
    });
  }

  return data;
};
