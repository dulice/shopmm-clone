import {faker} from '@faker-js/faker';
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateOrders(quantity) {
  const orders = [];
  const statuses = ['pending', 'shipped'];

  for (let i = 1; i <= quantity; i++) {
    const order = {
      id: i,
      customer_name: faker.internet.userName(),
      amount: faker.commerce.price(),
      created_at: randomDate(new Date(), new Date(2024, 11, 31)),
      status: statuses[Math.floor(Math.random() * statuses.length)]
    };
    orders.push(order);
  }

  return orders;
}

export const orders = generateOrders(50);